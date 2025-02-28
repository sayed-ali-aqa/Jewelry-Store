import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Label } from "@/components/ui/label"
import Link from 'next/link'

const page = () => {
    return (
        <>
            <h1 className='text-4xl font-bold text-center mb-12'>Sign Up</h1>

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

                    <span className='text-sm flex gap-1 -mt-2'>
                        Alreay have an account?
                        <Link href='/auth/sign-in' className='transition-all duration-300 underline hover:text-primary'>Sign in here</Link>
                    </span>

                    <Button variant="dark" className='w-fit py-6 font-semibold' size="lg">Sign Up</Button>
                </div>
            </form>
        </>
    )
}

export default page