"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { Facebook, Gem, Heart, Instagram, Menu, ShoppingBag, Twitter, User, X, Youtube } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
const Logo = '/images/logo/logo.png'

export function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className='border-b md:border-none sticky top-0 z-50'>
      <div className='bg-black px-4 py-1 flex items-center justify-between'>
        <div className='flex items-center gap-6 w-full md:w-fit justify-between'>
          <div className='flex items-center gap-1'>
            <Gem size={16} className='text-primary' />
            <p className='text-sm font-semibold text-white'>#1 Free Global Shipping</p>
          </div>

          <Select>
            <SelectTrigger className="w-[95px] border-none shadow-none text-white outline-none focus:ring-0 font-semibold">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English" className='focus:bg-white focus:text-primary'>English</SelectItem>
              <SelectItem value="French" className='focus:bg-white focus:text-primary'>French</SelectItem>
              <SelectItem value="German" className='focus:bg-white focus:text-primary'>German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='hidden md:flex items-center gap-12 justify-between'>
          <div className='flex items-center gap-4'>
            <Link href="/faqs" className='text-white transition-all duration-300 hover:text-primary text-sm font-semibold'>Faqs</Link>
            <Link href="/shipping" className='text-white transition-all duration-300 hover:text-primary text-sm font-semibold'>Shipping</Link>
          </div>

          <div className='flex items-center gap-3'>
            <Link href="https://facebook.com" className='text-white transition-all duration-300 hover:text-primary'><Facebook size={16} /></Link>
            <Link href="https://instagram.com" className='text-white transition-all duration-300 hover:text-primary'><Instagram size={16} /></Link>
            <Link href="https://twitter.com" className='text-white transition-all duration-300 hover:text-primary'><Twitter size={16} /></Link>
            <Link href="https://youtube.com" className='text-white transition-all duration-300 hover:text-primary'><Youtube size={16} /></Link>
          </div>
        </div>
      </div>

      <div className='bg-white flex gap-6 p-4 border:none md:border-b justify-between md:justify-around items-center'>
        <div className='flex h-[50px]'>
          <Image src={Logo} height="50" alt="Logo" width={50} />
        </div>

        <div className='hidden md:flex items-center gap-6'>
          <Link href="/" className='py-3 transition-all duration-300 hover:text-primary'>Home</Link>
          <div className="relative group">
            <button className="py-3 transition-all duration-300 hover:text-primary">Shop</button>

            <div className="absolute left-0 mt-0 w-[250px] bg-white shadow-md hidden flex-col gap-2 px-3 py-4 opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity duration-300">
              <Link href="/shop/rings" className='px-2 transition-all duration-300 hover:text-primary'>Rings</Link>
              <Link href="/shop/necklaces" className='px-2 transition-all duration-300 hover:text-primary'>Necklaces</Link>
              <Link href="/shop/bracelets" className='px-2 transition-all duration-300 hover:text-primary'>Bracelets</Link>
              <Link href="/shop/earings" className='px-2 transition-all duration-300 hover:text-primary'>Earrings</Link>
            </div>
          </div>
          <Link href="/contact-us" className='py-3 transition-all duration-300 hover:text-primary'>Contact Us</Link>
          <Link href="/about-us" className='py-3 transition-all duration-300 hover:text-primary'>About Us</Link>
          <Link href="/comming-soon" className='py-3 transition-all duration-300 hover:text-primary'>Comming Soon</Link>
        </div>

        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-1'>
            <Link href="/account/personal-info" className='transition-all duration-300 p-2 hover:text-primary'><User size={20} /></Link>
            <Link href="/account/whislist" className='transition-all duration-300 p-2 hover:text-primary'><Heart size={20} /></Link>
            <div className='transition-all duration-300 p-2 hover:text-primary cursor-pointer relative'>
              <ShoppingBag size={20} />
              <span className='absolute -top-1 right-0 bg-primary text-white text-xs font-semibold w-[22px] h-[22px] rounded-full text-center leading-[22px]'>2</span>
            </div>
          </div>

          <div className='md:hidden block'>
            {
              toggleMenu ? (
                <X size={20} onClick={() => setToggleMenu(!toggleMenu)} className='text-red-600' />
              ) : (
                <Menu size={20} onClick={() => setToggleMenu(!toggleMenu)} />
              )
            }
          </div>
        </div>
      </div>

      {/* Mobile Navs */}
      <div className={`${toggleMenu ? 'max-h-screen' : 'max-h-0'} bg-white overflow-hidden transition-all duration-500 flex flex-col items-center gap-6`}>
        <Link href="/" className='py-3 transition-all duration-300 hover:text-primary'>Home</Link>
        <div className="relative group">
          <button className="py-3 transition-all duration-300 hover:text-primary">Shop</button>

          <div className="absolute left-0 mt-0 w-[250px] bg-white shadow-md hidden flex-col gap-2 px-3 py-4 opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity duration-300">
            <Link href="/shop/rings" className='px-2 transition-all duration-300 hover:text-primary'>Rings</Link>
            <Link href="/shop/necklaces" className='px-2 transition-all duration-300 hover:text-primary'>Necklaces</Link>
            <Link href="/shop/bracelets" className='px-2 transition-all duration-300 hover:text-primary'>Bracelets</Link>
            <Link href="/shop/earings" className='px-2 transition-all duration-300 hover:text-primary'>Earrings</Link>
          </div>
        </div>
        <Link href="/contact-us" className='py-3 transition-all duration-300 hover:text-primary'>Contact Us</Link>
        <Link href="/about-us" className='py-3 transition-all duration-300 hover:text-primary'>About Us</Link>
        <Link href="/comming-soon" className='py-3 transition-all duration-300 hover:text-primary'>Comming Soon</Link>
      </div>
    </div>
  )
}
export default Navbar