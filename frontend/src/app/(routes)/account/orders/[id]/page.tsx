"use client";

import { orderProps } from '@types/allTypes';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getOrder } from '../../../../../lib/api';
import { notFound, useParams } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  const { id } = useParams() as { id: string };
  const [order, setOrder] = useState<orderProps | null>(null);

  const fetchOrder = async () => {
    try {
      const data = await getOrder(id);

      if (data) {
        setOrder(data?.data ?? null);
      } else {
        notFound()
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch order");
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  return (
    <div className='bg-white min-h-full p-6 flex flex-col gap-6'>
      {order ? (
        <div className='flex flex-col gap-6'>
          <div className='border p-6 flex flex-col gap-6'>
            <div className='flex justify-between gap-6 flex-wrap bg-slate-100 py-4 px-6'>
              <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Order #</span>
                <span className='font-bold'>{order?.documentId}</span>
              </div>
              <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Order Date</span>
                <span className='font-bold'>{format(new Date(order?.createdAt), 'dd MMM, yyyy')}</span>
              </div>
              <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Status</span>
                <span className='font-bold'>{order?.orderStatus}</span>
              </div>
              <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Amout</span>
                <span className='font-bold'>${(order?.total).toFixed(2)}</span>
              </div>
            </div>

            <div className='flex flex-col gap-4 flex-wrap'>
              {order.order_items.map((item: any, index: number) => (
                <div key={index} className='flex gap-6 border-t pt-6'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${item.product.images?.[0]?.url}`}
                    alt={item.product.name}
                    width={112}
                    height={140}
                  />

                  <div className='flex flex-col gap-4 justify-between py-1'>
                    <div className='flex flex-col gap-1'>
                      <Link href={`/products/${item.product.slug}`} className='font-bold text-lg transition-all duration-300 hover:text-primary'>{item.product.name}</Link>
                      <span className='text-slate-500 font-semibold'>${(item.unitPrice).toFixed(2)}</span>
                    </div>

                    <div className='flex flex-col gap-1'>
                      <span><span className='text-slate-500'>Quantity:</span> {item.quantity}</span>
                      <span><span className='text-slate-500'>Weight:</span> {item.product.weight} gs</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='border p-6 flex flex-col gap-6'>
            <div className='flex items-center justify-between border-b pb-6'>
              <span>Subtotal</span>
              <span>${(order.total - (order.totalShippingCost + order.tax)).toFixed(2)}</span>
            </div>

            <div className='flex items-center justify-between border-b pb-6'>
              <span>Tax</span>
              <span>${(order.tax).toFixed(2)}</span>
            </div>

            <div className='flex items-center justify-between border-b pb-6'>
              <span>Shipping</span>
              <span>${order.totalShippingCost}</span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='font-semibold text-lg'>Total</span>
              <span className='font-semibold text-lg'>${(order.total).toFixed(2)}</span>
            </div>
          </div>

          <div className='border p-6 flex gap-6 justify-between'>
            <div className='flex flex-col gap-3'>
              <h2 className='text-2xl font-semibold mb-3'>Delivery Address</h2>

              <div className='flex items-center gap-3'>
                <span className='text-slate-500'>Country:</span>
                <span>{order.country}</span>
              </div>

              <div className='flex items-center gap-3'>
                <span className='text-slate-500'>City:</span>
                <span>{order.city}</span>
              </div>

              <div className='flex items-center gap-3'>
                <span className='text-slate-500'>Zip Code:</span>
                <span>{order.zipCode}</span>
              </div>

              <div className='flex items-center gap-3'>
                <span className='text-slate-500'>Address:</span>
                <span>{order.address}</span>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <h2 className='text-2xl font-semibold mb-3'>Payment Method</h2>

              <div>
                {order.paymentMethod}
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <h2 className='text-2xl font-semibold mb-3'>Shipping Method</h2>

              <div>
                {order.shippingMethod}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Page;
