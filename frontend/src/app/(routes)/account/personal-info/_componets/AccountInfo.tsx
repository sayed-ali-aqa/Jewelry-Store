'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoUpdatType } from '@types/allTypes';
import { PersonalInfoForm } from '@utils/actions/personalInfo';
import { PersonalInfoUpdateSchema } from '@utils/validations/PersonalInfoValidation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { getUserInfoById } from '../../../../../lib/api';

const AccountInfo = () => {
    const [email, setEmail] = useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<personalInfoUpdatType>({
        resolver: zodResolver(PersonalInfoUpdateSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            id: '',
        },
    });

    const onSubmit = async (formData: personalInfoUpdatType) => {
        const response = await PersonalInfoForm(formData);

        if (response.status === 200) {
            toast.success("Personal info updated successfully");
        } else if (response.status === 403) {
            toast.error(response.error);
        } else {
            toast.error("Failed to update personal info");
        }
    };

    const fetchUserInfoById = async () => {
        try {
            const response = await getUserInfoById();
            const userInfo = response?.data[0];

            if (userInfo) {
                reset({
                    firstName: userInfo.firstName || '',
                    lastName: userInfo.lastName || '',
                    phone: userInfo.phone || '',
                    id: userInfo.documentId || '',
                });

                setEmail(userInfo?.users_permissions_user?.email)
            }
        } catch (error) {
            toast.error("Failed to fetch account info");
        }
    };

    useEffect(() => {
        fetchUserInfoById();
    }, []);

    return (
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
                            {errors.firstName && (
                                <span role="alert" className="text-destructive text-sm">
                                    {errors.firstName.message}
                                </span>
                            )}
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
                            {errors.lastName && (
                                <span role="alert" className="text-destructive text-sm">
                                    {errors.lastName.message}
                                </span>
                            )}
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
                            {errors.phone && (
                                <span role="alert" className="text-destructive text-sm">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>

                        {/* Email Input (disabled) */}
                        <div className="w-full flex flex-col gap-1">
                            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                            <Input
                                value={email}
                                className="h-12"
                                disabled
                            />
                        </div>

                        {/* Hidden ID */}
                        <input type="hidden" {...register("id")} />
                    </div>

                    <Button type="submit" variant="dark" className="w-fit h-12 font-semibold" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? <div className="spinner">Updating...</div> : "Update"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountInfo;
