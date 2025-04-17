import React from 'react'
import { Star, StarHalf } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const Reviews = () => {
    return (
        <section className='min-h-[400px] p-4 md:p-8 bg-[url("/images/covers/01.jpg")] bg-cover bg-center bg-no-repeat w-full flex justify-center items-center'>
            <div className='flex items-center justify-center gap-4 md:gap-8 bg-white w-full max-w-[700px] p-6 md:p-12'>
                <div className='flex flex-col space-y-4 items-center justify-center'>
                    <img src='/images/icons/trustpilot.svg' alt='Reviews about us on TrustPilot' height={46} />
                    <div className='flex gap-3 items-center justify-center sm:justify-start flex-wrap'>
                        <div className='flex space-x-1'>
                            <Star className='text-golden' width={20} height={20} />
                            <Star className='text-golden' width={20} height={20} />
                            <Star className='text-golden' width={20} height={20} />
                            <Star className='text-golden' width={20} height={20} />
                            <StarHalf className='text-golden' width={20} height={20} />
                        </div>

                        <p className='font-semibold'>198 Reviews</p>
                    </div>
                </div>

                <Separator orientation="vertical" className='h-20 w-[0.75px]' />

                <div className='flex flex-col space-y-4 items-center justify-center'>
                    <img src='/images/icons/google.svg' alt='Reviews about us on TrustPilot' height={48} />
                    <div className='flex gap-3 items-center justify-center sm:justify-start flex-wrap'>
                        <div className='flex space-x-1'>
                            <Star className='text-golden' width={20} height={20} />
                            <Star className='text-golden' width={20} height={20} />
                            <Star className='text-golden' width={20} height={20} />
                            <Star className='text-golden' width={20} height={20} />
                            <StarHalf className='text-golden' width={20} height={20} />
                        </div>

                        <p className='font-semibold'>258 Reviews</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reviews