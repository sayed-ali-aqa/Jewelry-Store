"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { signUpForm } from '@utils/actions/auth';
import { AuthProps } from '@types/allTypes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchema } from '@utils/validations/authValidation';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../store/slices/authSlice';
import { useRouter } from 'next/navigation';

const Page = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthProps>({
        resolver: zodResolver(AuthSchema),  // Use Zod resolver for validation
    });

    const onSubmit = async (data: AuthProps) => {
        const response = await signUpForm(data);  // Call the signup API with validated data

        if (response.user && response.status === 201) {
            dispatch(setUser(response.user));

            setTimeout(() => {
                router.push("/account/orders")
            }, 1000)
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-12">Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    {/* Email Input */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            className={`h-12 ${errors.email ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                            {...register("email")}
                        />
                        {errors.email && <span className="text-destructive text-sm">{errors.email?.message}</span>}
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                        <Input
                            type="password"
                            placeholder="Password"
                            className={`h-12 ${errors.password ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                            {...register("password")}
                        />
                        {errors.password && <span className="text-destructive text-sm">{errors.password?.message}</span>}
                    </div>

                    <span className='text-sm flex gap-1 -mt-2'>
                        Already have an account?
                        <Link href='/auth/sign-in' className='transition-all duration-300 underline hover:text-primary'>
                            Sign in here
                        </Link>
                    </span>

                    <Button type="submit" variant="dark" className="w-fit h-12 font-semibold" size="lg" disabled={isSubmitting}>
                        {
                            isSubmitting ? (
                                <img src="/images/icons/loader.svg" width={36} height={36} alt="Loader Icon" />
                            ) : (
                                "Sign Up"
                            )
                        }

                    </Button>
                </div>
            </form>
        </>
    );
};

export default Page;
