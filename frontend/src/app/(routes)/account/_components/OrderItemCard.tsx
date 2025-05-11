import { OrderItem, orderProps } from '@types/allTypes'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import OrderGeneralDetails from './OrderGeneralDetails'

const OrderItemCard = ({ order }: { order: orderProps }) => {
    return (
        <div className='bg-white min-h-full'>
            <div className='border p-6 flex flex-col gap-6'>
                <OrderGeneralDetails
                    orderNo={order?.documentId}
                    orderDate={order?.createdAt}
                    orderStatus={order?.orderStatus}
                    total={order?.total}
                />

                <div className='flex gap-4 flex-wrap'>
                    {order.order_items.map((item: OrderItem, index: number) => {
                        if (!item.product) return null;

                        return (
                            <div key={index}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.product.images?.[0]?.url}`}
                                    alt={item.product.name}
                                    width={112}
                                    height={140}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className='mt-4'>
                    <Link href={`/account/orders/${order.documentId}`} className="block border border-black py-4 px-6 text-center transition-all duration-300 hover:text-white hover:bg-black/90">Order Details</Link>
                </div>
            </div>
        </div>
    )
}

export default OrderItemCard