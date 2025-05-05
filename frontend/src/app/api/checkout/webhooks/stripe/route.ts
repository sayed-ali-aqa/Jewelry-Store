import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../../../lib/stripe'
import axios from 'axios';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
//  to test webhook run this:
// stripe listen --forward-to http://localhost:3000/api/checkout/webhooks/stripe

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature')!;
    const payload = await req.text();

    let event;

    try {
        // Verify the webhook signature
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.log(`⚠️ Webhook signature verification failed: ${err}`);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'charge.succeeded':
            const session = event.data.object;
            const orderId = session.metadata?.order_id;

            await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/checkout/orders/${orderId}`);

            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    // Acknowledge receipt of the event
    return NextResponse.json({ received: true });
}
