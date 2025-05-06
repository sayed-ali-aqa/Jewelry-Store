import { orderProps } from '@types/allTypes'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

const OrderItemCard = ({ order }: { order: orderProps }) => {
    return (
        <div className='bg-white min-h-full p-6'>
            <div className='border p-6 flex flex-col gap-6'>
                <div className='flex justify-between gap-6 flex-wrap bg-slate-100 py-4 px-6'>
                    <div className='flex flex-col gap-3'>
                        <span className='text-slate-600'>Order #</span>
                        <span className='font-bold'>{order.documentId}</span>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='text-slate-600'>Order Date</span>
                        <span className='font-bold'>{format(new Date(order.createdAt), 'dd MMM, yyyy')}</span>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='text-slate-600'>Status</span>
                        <span className='font-bold'>{order.orderStatus}</span>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className='text-slate-600'>Amout</span>
                        <span className='font-bold'>${(order.total).toFixed(2)}</span>
                    </div>
                </div>

                <div className='flex gap-4 flex-wrap'>
                    {order.order_items.map((item: any, index: number) => (
                        <div key={index}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.product.images?.[0]?.url}`} 
                                alt={item.product.name}
                                width={112} 
                                height={140}
                            />
                        </div>
                    ))}

                </div>

                <div className='mt-4'>
                    <Link href={`/account/orders/${order.documentId}`} className="block border border-black py-4 px-6 text-center transition-all duration-300 hover:text-white hover:bg-black/90">Order Details</Link>
                </div>
            </div>
        </div>
    )
}

export default OrderItemCard