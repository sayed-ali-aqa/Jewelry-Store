"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { Facebook, Gem, Heart, Instagram, Menu, Twitter, User, X, Youtube } from 'lucide-react'

import Image from 'next/image'
import { getWishlist } from '../../lib/api'
import { toast } from 'sonner'
const Logo = '/images/logo/logo.png'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { CartSheet } from './CartSheet'
import LanguageSelect from './LanguageSelect'

export function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const wishlistStatus = useSelector((state: RootState) => state.wishlistStatus.wishlistStatus);
  const [wishlistCount, setWishlistCount] = useState<number>(0)

  const fetchWishlist = async () => {
    try {
      const wishlist = await getWishlist()
      setWishlistCount(wishlist?.meta?.pagination?.total || 0)

    } catch (error) {
      toast.error("Failed to fetch wishlist")
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [isAuthenticated, wishlistStatus])

  return (
    <div className='border-b md:border-none sticky top-0 z-50'>
      <div className='bg-black px-4 py-1 flex items-center justify-between'>
        <div className='flex items-center gap-6 w-full md:w-fit justify-between'>
          <div className='flex items-center gap-1'>
            <Gem size={16} className='text-primary' />
            <p className='text-sm font-semibold text-white'>#1 Free Global Shipping</p>
          </div>

          <LanguageSelect />
        </div>

        <div className='hidden md:flex items-center gap-12 justify-between'>
          <div className='flex items-center gap-4'>
            <Link href="#" className='text-white transition-all duration-300 hover:text-primary text-sm font-semibold'>Faqs</Link>
            <Link href="#" className='text-white transition-all duration-300 hover:text-primary text-sm font-semibold'>Shipping</Link>
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
          <Link href="/">
            <Image src={Logo} height="50" alt="Logo" width={50} />
          </Link>

        </div>

        <div className='hidden md:flex items-center gap-6'>
          <Link href="/" className='py-3 transition-all duration-300 hover:text-primary'>Home</Link>
          <Link href="/products" className='py-3 transition-all duration-300 hover:text-primary'>Products</Link>
          <Link href="/contact-us" className='py-3 transition-all duration-300 hover:text-primary'>Contact Us</Link>
          <Link href="/about-us" className='py-3 transition-all duration-300 hover:text-primary'>About Us</Link>
          <Link href="#" className='py-3 transition-all duration-300 hover:text-primary'>Comming Soon</Link>
        </div>

        <div className='flex items-center gap-6'>
          <div className='flex items-center gap-1'>
            <Link href="/account/personal-info" className='transition-all duration-300 p-2 hover:text-primary'><User size={20} /></Link>

            <Link href="/account/wishlist" className='transition-all duration-300 p-2 hover:text-primary cursor-pointer relative'>
              <Heart size={20} />
              <span className='absolute -top-1 right-0 bg-primary text-white text-xs font-semibold w-[22px] h-[22px] rounded-full text-center leading-[22px]'>{wishlistCount}</span>
            </Link>

            <CartSheet />
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
        <Link href="/products" className='py-3 transition-all duration-300 hover:text-primary'>Products</Link>
        <Link href="/contact-us" className='py-3 transition-all duration-300 hover:text-primary'>Contact Us</Link>
        <Link href="/about-us" className='py-3 transition-all duration-300 hover:text-primary'>About Us</Link>
        <Link href="#" className='py-3 transition-all duration-300 hover:text-primary'>Comming Soon</Link>
      </div>
    </div>
  )
}
export default Navbar