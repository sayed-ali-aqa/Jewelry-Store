import React from 'react'
import Reviews from '@/components/Reviews'

const page = () => {
    return (
        <div className="my-20">
            <section className='min-h-[400px] p-4 md:p-8 bg-[url("/images/covers/01.jpg")] bg-cover bg-center bg-no-repeat w-full flex justify-center items-center'>
                <div className='bg-white w-full max-w-[700px] p-6 md:p-12'>
                    <Reviews />
                </div>
            </section>
        </div>
    )
}

export default page