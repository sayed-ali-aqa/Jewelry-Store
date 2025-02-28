import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Label } from "@/components/ui/label"
import Link from 'next/link'

const page = () => {
    return (
        <>
            <h1 className='text-3xl font-bold text-center mb-12'>Sign In</h1>

            <form action="">
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-1'>
                        <Label htmlFor="email">Email <span className='text-destructive'>*</span></Label>
                        <Input
                            type="email"
                            placeholder='Email'
                            className='h-12'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <Label htmlFor="password">Password <span className='text-destructive'>*</span></Label>
                        <Input
                            type="password"
                            placeholder='Password *'
                            className='h-12'
                        />
                    </div>

                    <div className='-mt-2 flex justify-between items-center'>
                        <span className='text-sm flex gap-1'>
                            Don't have an account?
                            <Link href='/auth/sign-up' className='transition-all duration-300 underline hover:text-primary'>Create one here</Link>
                        </span>

                        <span className='text-sm'>
                            <Link href='/auth/forgot-password' className='transition-all duration-300 hover:text-primary'>Forgot Password?</Link>
                        </span>
                    </div>

                    <Button variant="dark" className='w-fit py-6 font-semibold' size="lg">Sign In</Button>
                </div>
            </form>
        </>
    )
}

export default page