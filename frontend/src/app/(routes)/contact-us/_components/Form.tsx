"use client";

import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { ContactRequestProps } from '@types/allTypes';
import { contactRequestSchema } from '@utils/validations/contactRequestValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactForm } from '@utils/actions/contact';

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactRequestProps>({
        resolver: zodResolver(contactRequestSchema),  // Use Zod resolver for validation
    });

    const onSubmit = async (data: ContactRequestProps) => {
        const response = await contactForm(data);  // Call the contact API with validated data

        if (response.status === 201) {
            toast.success("Contact sbumitted successfully!")
        } else {
            toast.error(response.error)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
                {/* Name Input */}
                <div className="flex flex-col gap-1">
                    <Input
                        type="text"
                        placeholder='Your Name *'
                        className={`h-12 ${errors.name ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("name")}
                    />

                    {errors.name && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.name?.message}</span>}
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1">
                    <Input
                        type="email"
                        placeholder='Your Email *'
                        className={`h-12 ${errors.email ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("email")}
                    />

                    {errors.email && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.email?.message}</span>}
                </div>

                {/* Title Input */}
                <div className="flex flex-col gap-1">
                    <Input
                        type="text"
                        placeholder='Your Title *'
                        className={`h-12 ${errors.title ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("title")}
                    />

                    {errors.title && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.title?.message}</span>}
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1">
                    <Textarea
                        placeholder='Your Message *'
                        className={`${errors.message ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("message")}
                        rows={8}
                    />

                    {errors.message && <span role="alert" aria-live="assertive" className="text-destructive text-sm">{errors.message?.message}</span>}
                </div>

                <Button type="submit" variant="dark" className='w-fit h-12 font-semibold' size="lg" disabled={isSubmitting}>
                    {isSubmitting ? <div className="spinner" /> : "Send Message"}
                </Button>
            </div>
        </form>
    )
}

export default Form