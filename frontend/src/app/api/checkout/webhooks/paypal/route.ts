import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const webhookId = process.env.PAYPAL_WEBHOOK_ID!;
    const transmissionId = req.headers.get('paypal-transmission-id');
    const timestamp = req.headers.get('paypal-transmission-time');
    const webhookSignature = req.headers.get('paypal-transmission-sig');
    const certUrl = req.headers.get('paypal-cert-url');
    const authAlgo = req.headers.get('paypal-auth-algo');

    // Verify Webhook Signature
    const verifyRes = await fetch(`${process.env.PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getPayPalAccessToken()}`,
        },
        body: JSON.stringify({
            auth_algo: authAlgo,
            cert_url: certUrl,
            transmission_id: transmissionId,
            transmission_sig: webhookSignature,
            transmission_time: timestamp,
            webhook_id: webhookId,
            webhook_event: JSON.parse(rawBody),
        }),
    });

    const verification = await verifyRes.json();

    if (verification.verification_status !== 'SUCCESS') {
        console.error('Webhook verification failed', verification);
        return new NextResponse('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(rawBody);

    // Handle Event Types
    if (event.event_type === 'CHECKOUT.ORDER.APPROVED') {
        console.log('Order approved:', event.resource.id);
        // Optionally, mark order as approved in DB
    }

    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        console.log('Payment captured:', event.resource.id);
        const orderId = event.resource.supplementary_data?.related_ids?.order_id;
        console.log("orderId: ", orderId);
        
        // Update your order status in DB as "Paid"
    }

    return new NextResponse('OK', { status: 200 });
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
