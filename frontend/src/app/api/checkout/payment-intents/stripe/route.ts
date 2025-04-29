import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../../../lib/stripe'

export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      automatic_tax: { enabled: true },
    });
    if (session.url) {
      return NextResponse.redirect(session.url, 303)
    } else {
      return NextResponse.json(
        { error: 'Session URL is null' },
        { status: 500 }
      )
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = err instanceof Error && 'statusCode' in err ? (err as any).statusCode : 500;
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}