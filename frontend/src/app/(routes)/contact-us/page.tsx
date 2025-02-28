import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'


const page = () => {
    return (
        <div className='py-16 px-4'>
            <section className='mb-20 max-w-[1200px] mx-auto flex gap-4 flex-col md:flex-row justify-around'>
                <div className='flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-4 mb-4'>
                        <Phone size={22} className='text-primary' />
                        <h2 className='text-2xl font-semibold'>Call Us</h2>
                    </div>

                    <p className='text-slate-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, explicabo?</p>
                    <a href="tel:073843743" className='transition-all duration-300 hover:text-primary font-semibold'>073 843 7433</a>
                </div>

                <Separator orientation='vertical' className='h-[1px] md:h-40 w-full md:w-[0.75px] my-auto' />

                <div className='flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-4 mb-4'>
                        <Mail size={22} className='text-primary' />
                        <h2 className='text-2xl font-semibold'>Write Us</h2>
                    </div>

                    <p className='text-slate-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, explicabo?</p>
                    <a href="mailto:example@gmail.com" className='transition-all duration-300 hover:text-primary font-semibold'>example@gmail.com</a>
                </div>

                <Separator orientation='vertical' className='h-[1px] md:h-40 w-full md:w-[0.75px] my-auto' />

                <div className='flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-4 mb-4'>
                        <MapPin size={22} className='text-primary' />
                        <h2 className='text-2xl font-semibold'>Find Us</h2>
                    </div>

                    <p className='text-slate-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, explicabo?</p>
                    <a href="https:maps.google.com" className='transition-all duration-300 hover:text-primary font-semibold'>12 S Main St, Yardley, PA 19067, USA</a>
                </div>
            </section>

            <section className='mx-auto max-w-4xl'>
                <h1 className='text-4xl font-bold text-center mb-12'>Contact Us</h1>

                <form action="">
                    <div className='flex flex-col gap-6'>
                        <div>
                            <Input
                                type="text"
                                placeholder='Your Name *'
                                className='h-12'
                            />
                        </div>

                        <div>
                            <Input
                                type="email"
                                placeholder='Your Email *'
                                className='h-12'
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                placeholder='Title *'
                                className='h-12'
                            />
                        </div>

                        <div>
                            <Textarea
                                rows={8}
                                placeholder='Your Name *'
                            />
                        </div>

                        <Button variant="dark" className='w-fit h-12 font-semibold'>Send Message</Button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default page