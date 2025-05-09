'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountPasswordType } from '@types/allTypes';
import { ChangeAccountPassword } from '@utils/actions/personalInfo';
import { AccountPasswordSchema, PersonalInfoUpdateSchema } from '@utils/validations/PersonalInfoValidation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const AccountPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AccountPasswordType>({
        resolver: zodResolver(AccountPasswordSchema)
    });

    const onSubmit = async (formData: AccountPasswordType) => {
        const response = await ChangeAccountPassword(formData);

        if (response.status === 200) {
            toast.success("Password changed successfully");
        } else if (response.status === 400) {
            toast.error(response.error);
        } else {
            toast.error("Failed to change password");
        }
    };

    return (
        <div className='bg-white p-6'>
            <h2 className='text-3xl mb-8'>Password</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    {/* Current Password Input */}
                    <div className="w-full flex flex-col gap-1">
                        <Label htmlFor="currentPassword">Current Password <span className="text-destructive">*</span></Label>
                        <Input
                            type="password"
                            placeholder="Current Password"
                            className={`h-12 ${errors.currentPassword ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                            {...register("currentPassword")}
                        />
                        {errors.currentPassword && (
                            <span role="alert" className="text-destructive text-sm">
                                {errors.currentPassword.message}
                            </span>
                        )}
                    </div>

                    <div className='flex gap-6'>
                        {/* New Password Input */}
                        <div className="w-full flex flex-col gap-1">
                            <Label htmlFor="newPassword">New Password <span className="text-destructive">*</span></Label>
                            <Input
                                type="password"
                                placeholder="New Password"
                                className={`h-12 ${errors.newPassword ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                                {...register("newPassword")}
                            />
                            {errors.newPassword && (
                                <span role="alert" className="text-destructive text-sm">
                                    {errors.newPassword.message}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="w-full flex flex-col gap-1">
                            <Label htmlFor="confirmPassword">Confirm Password <span className="text-destructive">*</span></Label>
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                className={`h-12 ${errors.confirmPassword ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <span role="alert" className="text-destructive text-sm">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <Button type="submit" variant="dark" className="w-[140px] h-12 font-semibold" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader size={18} className="animate-spin" />
                        ) : (
                            "Change"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AccountPassword;
