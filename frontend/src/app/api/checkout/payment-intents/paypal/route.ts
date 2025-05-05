import { calculateItemPriceAfterDiscount, calculateNumOfCartItems } from '@utils/functions/calculate';
import { getShippingMethodValue } from '@utils/functions/checkout';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { orderId, shippingMethod, email, userId, token } = await req.json();

  const query = new URLSearchParams({
    'populate[products][populate]': 'images',
    'sort[0]': 'createdAt:desc',
    'filters[users_permissions_user][id][$eq]': userId,
  });

  const cartItemsResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/carts?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const cartItems = cartItemsResponse?.data?.data || [];

  if (cartItemsResponse.status !== 200 || cartItems.length === 0) {
    return new NextResponse(JSON.stringify({ message: 'Shopping cart is empty' }), { status: 404 });
  }

  const unitShippingCost = getShippingMethodValue(shippingMethod);
  const totalCartCount = calculateNumOfCartItems(cartItems);
  const totalShippingCost = unitShippingCost * totalCartCount;

  const items = cartItems.map((item: any) => {
    const unitPrice = calculateItemPriceAfterDiscount(item.products.price, item.products.discount);
    return {
      name: item.products.name,
      unit_amount: {
        currency_code: 'USD',
        value: unitPrice.toFixed(2),
      },
      quantity: item.quantity.toString(),
    };
  });

  const subTotal = items.reduce((sum: number, item: any) => {
    return sum + parseFloat(item.unit_amount.value) * parseInt(item.quantity);
  }, 0);

  const total = subTotal + totalShippingCost;

  const auth = await getPayPalAccessToken();

  const orderRes = await fetch(`${process.env.PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          custom_id: orderId, // Attaching orderId 
          items,
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: subTotal.toFixed(2),
              },
              shipping: {
                currency_code: 'USD',
                value: totalShippingCost.toFixed(2),
              },
            },
          },
        },
      ],
      application_context: {
        brand_name: 'Jewelry Store',
        landing_page: 'LOGIN',
        user_action: 'PAY_NOW',
        shipping_preference: 'GET_FROM_FILE',
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/canceled`,
      },
    }),
  });

  const data = await orderRes.json();

  return NextResponse.json(data);
}

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');

  const res = await fetch(`${process.env.PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  return data.access_token;
}
