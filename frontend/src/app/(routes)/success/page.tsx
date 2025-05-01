'use client'

import { notFound } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
        notFound()
    }

    return (
        <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Payment Success</h1>
        </div>
    )
}
