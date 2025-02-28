"use client"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import Image from 'next/image'
const Logo = '/images/logo/logo.png'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    const date = new Date();
    setCurrentYear(date.getFullYear());
  }, []);

  return (
    <div>
      <div className='bg-black grid grid-cols-12 justify-between gap-6 xl:gap-12 px-4 xl:px-[8%] py-[60px]'>
        <div className='col-span-12 lg:col-span-5 w-full flex flex-col gap-10'>
          <div className='flex flex-col max-w-[400px]'>
            <div className='w-fit flex flex-col items-center'>
              <Image src={Logo} height={60} width={60} alt="Logo" />
              <h2 className='font-semibold text-primary text-2xl'>Gem Jewelery Store</h2>
            </div>

            <p className='text-white mt-1 font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nostrum a. Architecto earum aut inventore quaerat deserunt nisi distinctio reiciendis!</p>
          </div>

          <div className='w-full max-w-[350px]'>
            <h3 className='text-white text-lg uppercase font-normal mb-2'>Subscribe to our Newsletter</h3>
            <form action="">
              <div className='relative'>
                <Input type="email" placeholder='Your email' className='w-full py-[22px] focus:border-primary text-white' />
                <Button variant="outline" className='absolute bg-transparent text-white top-0 right-0 border-l-1 py-[22px] uppercase transition-all duration-300 hover:bg-primary hover:text-white'>Subscribe</Button>
              </div>
            </form>
          </div>
        </div>

        <div className='col-span-6 md:col-span-4 lg:col-span-2 w-full flex flex-col gap-5'>
          <h3 className='text-white font-semibold text-xl uppercase'>Links</h3>
          <div className="flex flex-col gap-3">
            <Link href="/" className='text-white transition-all duration-300 hover:text-primary'>Home</Link>
            <Link href="/contact-us" className='text-white transition-all duration-300 hover:text-primary'>Contact Us</Link>
            <Link href="/about-us" className='text-white transition-all duration-300 hover:text-primary'>About Us</Link>
            <Link href="/comming-soon" className='text-white transition-all duration-300 hover:text-primary'>Comming Soon</Link>
            <Link href="/faqs" className='text-white transition-all duration-300 hover:text-primary'>Faqs</Link>
            <Link href="/shipping" className='text-white transition-all duration-300 hover:text-primary'>Shipping</Link>
          </div>
        </div>

        <div className='col-span-6 md:col-span-4 lg:col-span-2 w-full flex flex-col gap-5'>
          <h3 className='text-white font-semibold text-xl uppercase'>Shop</h3>
          <div className="flex flex-col gap-3">
            <Link href="/shop/rings" className='text-white transition-all duration-300 hover:text-primary'>Rings</Link>
            <Link href="/shop/necklaces" className='text-white transition-all duration-300 hover:text-primary'>Necklaces</Link>
            <Link href="/shop/bracelets" className='text-white transition-all duration-300 hover:text-primary'>Bracelets</Link>
            <Link href="/shop/earings" className='text-white transition-all duration-300 hover:text-primary'>Earrings</Link>
          </div>
        </div>

        <div className='col-span-6 md:col-span-4 lg:col-span-3 w-full flex flex-col gap-5'>
          <h3 className='text-white font-semibold text-xl uppercase'>Contact</h3>
          <div className="flex flex-col gap-3">
            <Link href="tel:0203438746" className='text-white transition-all duration-300 hover:text-primary'>020 343 8746</Link>
            <Link href="mailto:info@gemjewelry.com" className='text-white transition-all duration-300 hover:text-primary'>info@gemjewelry.com</Link>
            <Link href="https:googlemap.com" className='text-white transition-all duration-300 hover:text-primary'>1234 Goldsmith Lane, Suite 56</Link>

            <div className='mt-3'>
              <h3 className='text-white text-xl font-semibold mb-3'>Follow us on</h3>

              <div className='flex items-center gap-3'>
                <Link href="https://facebook.com" className='text-white transition-all duration-300 hover:text-primary'><Facebook size={18} /></Link>
                <Link href="https://instagram.com" className='text-white transition-all duration-300 hover:text-primary'><Instagram size={18} /></Link>
                <Link href="https://twitter.com" className='text-white transition-all duration-300 hover:text-primary'><Twitter size={18} /></Link>
                <Link href="https://youtube.com" className='text-white transition-all duration-300 hover:text-primary'><Youtube size={18} /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-primary py-1 px-4 flex justify-between items-center gap-4 flex-wrap'>
        <div>
          <span className='text-sm '>
            &copy;  {currentYear} All rights reserved. Developed by
            <Link href="https://sayedalimousavi.com/" className='text-nowrap transition-all duration-300 ml-1 hover:text-primary font-semibold'>Sayed Ali Aqa Mousavi</Link>
          </span>
        </div>

        <div className='flex gap-2 items-center max-h-[40px]'>
          <img src="/images/cards/paypal.svg" height={20} className='max-h-[32px]' alt="" />
          <img src="/images/cards/visa.svg" height={20} className='max-h-[32px]' alt="" />
          <img src="/images/cards/mastercard.svg" height={20} className='max-h-[32px]' alt="" />
          <img src="/images/cards/amex.svg" height={20} className='max-h-[32px]' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer