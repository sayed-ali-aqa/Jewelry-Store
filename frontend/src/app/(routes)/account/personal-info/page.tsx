'use client';

import React from 'react'
import AccountInfo from './_componets/AccountInfo';

const page = () => {
   

    return (
        <div className='min-h-full flex flex-col gap-6'>
            <AccountInfo />

            <div className='bg-white p-6'>
                login 2
            </div>

            <div className='bg-white p-6'>
                login 3
            </div>
        </div>
    )
}

export default page