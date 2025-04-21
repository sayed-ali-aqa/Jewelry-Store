'use client';

import React from 'react'
import AccountInfo from './_componets/AccountInfo';
import AccountPassword from './_componets/AccountPassword';

const page = () => {
    return (
        <div className='min-h-full flex flex-col gap-6'>
            <AccountInfo />

            <AccountPassword />
        </div>
    )
}

export default page