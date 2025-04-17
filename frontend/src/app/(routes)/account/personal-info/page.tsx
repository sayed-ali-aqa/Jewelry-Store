'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoType } from '@types/allTypes';
import { PersonalInfoForm } from '@utils/actions/personalInfo';
import { PersonalInfoSchema } from '@utils/validations/PersonalInfoValidation';
import { useForm } from 'react-hook-form';
import React from 'react'
import { toast } from 'sonner';

const page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<personalInfoType>({
        resolver: zodResolver(PersonalInfoSchema),  // Use Zod resolver for validation
    });

    const onSubmit = async (data: personalInfoType) => {
        const response = await PersonalInfoForm(data);  // Call the signup API with validated data

        console.log(response);
        if (response.status === 200) {
            toast.success("Personal info updated successfully")
        } else {
            toast.error("Failed to update personal info")
        }
    };

    return (
        <div className='min-h-full flex flex-col gap-6'>
            <div className='bg-white p-6'>
                <h2 className='text-3xl mb-8'>Account Info</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className='flex gap-6'>
                            {/* First name Input */}
                            <div className="w-full flex flex-col gap-1">
                                <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                                <Input
                                    type="text"
                                    placeholder="First Name"
                                    className={`h-12 ${errors.firstName ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                                    {...register("firstName")}
                                />

                                {errors.firstName && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.firstName?.message}</span>}
                            </div>

                            {/* Last name Input */}
                            <div className="w-full flex flex-col gap-1">
                                <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                                <Input
                                    type="text"
                                    placeholder="Last Name"
                                    className={`h-12 ${errors.lastName ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                                    {...register("lastName")}
                                />

                                {errors.lastName && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.lastName?.message}</span>}
                            </div>
                        </div>

                        <div className='flex gap-6'>
                            {/* Phone Input */}
                            <div className="w-full flex flex-col gap-1">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    type="tel"
                                    placeholder="Phone"
                                    className={`h-12 ${errors.phone ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                                    {...register("phone")}
                                />

                                {errors.phone && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.phone?.message}</span>}
                            </div>

                            {/* Email Input */}
                            <div className="w-full flex flex-col gap-1">
                                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                                <Input
                                    value="alipoya321@gmail.com"
                                    className="h-12"
                                    disabled
                                />
                            </div>
                        </div>

                        <Button type="submit" variant="dark" className="w-fit h-12 font-semibold" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? <div className="spinner">Updating...</div> : "Update"}
                        </Button>
                    </div>
                </form>
            </div>

            <div className='bg-white p-6'>
                login 2
            </div>

            <div className='bg-white p-6'>
                login 3
            </div>
        </div>
    )
}

export default page