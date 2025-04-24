"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DeliveryAddressProps } from '@types/allTypes'

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ register, errors }) => {
    return (
        <div className='bg-white p-6 flex flex-col gap-6'>
            <h2 className='text-2xl'>Delivery Address</h2>

            <div className='flex gap-6'>
                <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                    <Input
                        type="text"
                        placeholder="First Name"
                        className={`h-12 ${errors.firstName ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("firstName")}
                    />
                    {errors.firstName && <span role="alert" className="text-destructive text-sm">{errors.firstName.message}</span>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                    <Input
                        type="text"
                        placeholder="Last Name"
                        className={`h-12 ${errors.lastName ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("lastName")}
                    />
                    {errors.lastName && <span role="alert" className="text-destructive text-sm">{errors.lastName.message}</span>}
                </div>
            </div>

            <div className='flex gap-6'>
                <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        type="tel"
                        placeholder="Phone"
                        className={`h-12 ${errors.phone ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("phone")}
                    />
                    {errors.phone && <span role="alert" className="text-destructive text-sm">{errors.phone.message}</span>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input
                        type="email"
                        placeholder="Email"
                        className={`h-12 ${errors.email ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("email")}
                    />
                    {errors.email && <span className="text-destructive text-sm">{errors.email.message}</span>}
                </div>
            </div>

            <div className="w-full flex flex-col gap-1">
                <Label htmlFor="country">Country <span className="text-destructive">*</span></Label>
                <Input
                    type="text"
                    placeholder="Country"
                    className={`h-12 ${errors.country ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                    {...register("country")}
                />
                {errors.country && <span className="text-destructive text-sm">{errors.country.message}</span>}
            </div>

            <div className="w-full flex flex-col gap-1">
                <Label htmlFor="address">Address <span className="text-destructive">*</span></Label>
                <Input
                    type="text"
                    placeholder="Address"
                    className={`h-12 ${errors.address ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                    {...register("address")}
                />
                {errors.address && <span className="text-destructive text-sm">{errors.address.message}</span>}
            </div>

            <div className='flex gap-6'>
                <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                    <Input
                        type="text"
                        placeholder="City"
                        className={`h-12 ${errors.city ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("city")}
                    />
                    {errors.city && <span className="text-destructive text-sm">{errors.city.message}</span>}
                </div>

                <div className="w-full flex flex-col gap-1">
                    <Label htmlFor="zipCode">Zip Code <span className="text-destructive">*</span></Label>
                    <Input
                        type="text"
                        placeholder="Zip Code"
                        className={`h-12 ${errors.zipCode ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                        {...register("zipCode")}
                    />
                    {errors.zipCode && <span className="text-destructive text-sm">{errors.zipCode.message}</span>}
                </div>
            </div>

            <div className="w-full flex flex-col gap-1">
                <Textarea
                    rows={6}
                    placeholder="Note"
                    className={`${errors.note ? "border-2 border-destructive focus-visible:ring-0" : ""}`}
                    {...register("note")}
                />
                {errors.note && <span className="text-destructive text-sm">{errors.note.message}</span>}
            </div>
        </div>
    )
}

export default DeliveryAddress
