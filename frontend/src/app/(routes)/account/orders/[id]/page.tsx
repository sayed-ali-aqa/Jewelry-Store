"use client";

import { orderProps } from '@types/allTypes';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getOrder } from '../../../../../lib/api';
import { notFound, useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams() as { id: string };
  const [order, setOrder] = useState<orderProps | null>(null);

  const fetchOrder = async () => {
    try {
      const data = await getOrder(id);
      
      if(data && data?.data.length > 0){
          setOrder(data?.data[0] ?? null);
      }else{
        notFound()
      }
    } catch (error) {
      toast.error("Failed to fetch order");
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  return (
    <div className='bg-white min-h-full p-6 flex flex-col gap-6'>
      <div className='bg-slate-100 px-6 py-4'>

      </div>
    </div>
  );
};

export default Page;
