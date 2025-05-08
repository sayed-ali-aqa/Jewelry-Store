import { OrderGeneralDetailsProps } from '@types/allTypes'
import { format } from 'date-fns'
import React from 'react'

const OrderGeneralDetails: React.FC<OrderGeneralDetailsProps> = ({orderNo, orderDate, orderStatus, total}) => {
    return (
        <div className='flex justify-between gap-6 flex-wrap bg-slate-100 py-4 px-6'>
            <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Order #</span>
                <span className='font-bold'>{orderNo}</span>
            </div>
            <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Order Date</span>
                <span className='font-bold'>{format(new Date(orderDate), 'dd MMM, yyyy')}</span>
            </div>
            <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Status</span>
                <span className='font-bold'>{orderStatus}</span>
            </div>
            <div className='flex flex-col gap-3'>
                <span className='text-slate-600'>Amout</span>
                <span className='font-bold'>${(total).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default OrderGeneralDetails