import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../../../lib/stripe'
import axios from 'axios'
import { calculateItemPriceAfterDiscount, calculateNumOfCartItems } from '@utils/functions/calculate'
import { getShippingDurationValue, getShippingMethodValue } from '@utils/functions/checkout'

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // -------------------- Order items ---------------------------
    const { shippingMethod, email, userId, token } = await req.json();

    // getting cart items
    const query = new URLSearchParams({
      'populate[products][populate]': 'images',
      'sort[0]': 'createdAt:desc',
      'filters[users_permissions_user][id][$eq]': userId,
    });

    const cartItemsResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const cartItems = cartItemsResponse?.data?.data || [];

    // if there is error or cart is empty
    if (cartItemsResponse.status !== 200 || cartItems.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Shopping cart is empty" }),
        { status: 404 }
      );
    }
    // -------------------- Order items ---------------------------
    const line_items = cartItems.map((item: any) => {
      const unitPrice = calculateItemPriceAfterDiscount(item.products.price, item.products.discount);

      // Build absolute image URL
      const imageUrl = item?.products?.images?.[0]?.url
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${item.products.images[0].url}`
        : '';

      return {
        price_data: {
          currency: 'usd', // Change if needed
          product_data: {
            name: item?.products?.name,
            images: imageUrl ? [imageUrl] : [], // Stripe requires valid absolute URLs
          },
          unit_amount: Math.round(unitPrice * 100), // Stripe expects cents
        },
        quantity: item?.quantity,
      };
    });

    console.log("--------------------------", shippingMethod);
    

    // calculating total shipping cost
    const unitShippingCost = getShippingMethodValue(shippingMethod)
    const totalCartCount = calculateNumOfCartItems(cartItems)
    const totalShippingCost = unitShippingCost * totalCartCount;

    const { minShippingDuration, maxShippingDuration } = getShippingDurationValue(shippingMethod)

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/canceled`,
      automatic_tax: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: totalShippingCost * 100, // $5 shipping Note: Shipping cost is in cent
              currency: 'usd',
            },
            display_name: shippingMethod,
            delivery_estimate: {
              minimum: { unit: 'business_day', value: minShippingDuration },
              maximum: { unit: 'business_day', value: maxShippingDuration },
            },
          },
        },
      ],
    })

    if (session.url) {
      return NextResponse.json({ url: session.url }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: 'Session URL is null' },
        { status: 500 }
      )
    }
  } catch (err) {
    console.log("Stripe Error: ", err);


    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = err instanceof Error && 'statusCode' in err ? (err as any).statusCode : 500;
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}