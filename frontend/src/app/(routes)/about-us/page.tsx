import React from 'react'
import Reviews from '@/components/Reviews'
import Image from 'next/image'
const storyImage = '/images/covers/03.jpg'
const whyUs = '/images/covers/02.jpg'

const page = () => {
    return (
        <div>
            <Reviews />

            <section className='py-16 px-4 max-w-[1200px] mx-auto flex flex-col gap-20'>
                <div className='flex gap-8 items-center flex-col md:flex-row'>
                    <div className='w-full md:w-1/2'>
                        <Image src={storyImage} className='mx-auto' alt="Our Story" width={500} height={600} />
                    </div>

                    <div className='w-full md:w-1/2'>
                        <span className='uppercase text-slate-400 font-semibold text-sm'>Our Story</span>

                        <h2 className='text-4xl font-semibold mt-2'>A Short Story of Us</h2>
                        <p className='mt-6 text-lg md:text-xl text-slate-600 leading-7 md:leading-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa expedita ea voluptates possimus totam, sapiente repellendus eligendi temporibus modi minus consequatur placeat velit similique aut, eaque omnis eos? Dolor, quaerat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia at id eos tempore odit quibusdam quia minus sint! Accusamus sed earum suscipit blanditiis qui sint beatae magni reiciendis odit voluptates!</p>
                    </div>
                </div>

                <div className='flex gap-8 items-center flex-col md:flex-row'>
                    <div className='w-full md:w-1/2 order-2 md:order-1'>
                        <span className='uppercase text-slate-400 font-semibold text-sm'>Why Us</span>

                        <h2 className='text-4xl font-semibold mt-2'>We Value Your Feelings</h2>
                        <p className='mt-6 text-lg md:text-xl text-slate-600 leading-7 md:leading-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa expedita ea voluptates possimus totam, sapiente repellendus eligendi temporibus modi minus consequatur placeat velit similique aut, eaque omnis eos? Dolor, quaerat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia at id eos tempore odit quibusdam quia minus sint! Accusamus sed earum suscipit blanditiis qui sint beatae magni reiciendis odit voluptates!</p>
                    </div>

                    <div className='w-full md:w-1/2 order-1 md:order-2'>
                        <Image src={whyUs} className='mx-auto' alt="Our Story" width={500} height={600} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page