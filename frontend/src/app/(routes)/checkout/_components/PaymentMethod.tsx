"use client"

import React from 'react'
import { FieldErrors, Control, Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { CheckoutType } from '@types/allTypes'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PaymentMethodProps {
    errors: FieldErrors<CheckoutType>
    control: Control<CheckoutType>
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ errors, control }) => {
    return (
        <div className='bg-white p-6 flex flex-col gap-6'>
            <h2 className='text-2xl'>Payment Methods</h2>

            <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <Label htmlFor="Credit" className="flex items-center space-x-3">
                            <RadioGroupItem value="Credit" id="Credit" />
                            <h3 className='text-lg'>Credit Card</h3>
                        </Label>

                        <Label htmlFor="Paypal" className="flex items-center space-x-3">
                            <RadioGroupItem value="Paypal" id="Paypal" />
                            <h3 className='text-lg'>Paypal</h3>
                        </Label>
                    </RadioGroup>
                )}
            />
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}

            <div className='flex flex-col gap-2'>
                <h3 className='font-semibold'>We Accept:</h3>
                <div className='flex gap-4'>
                    <img src="/images/cards/paypal.svg" height={20} className='max-h-[32px]' alt="" />
                    <img src="/images/cards/visa.svg" height={20} className='max-h-[32px]' alt="" />
                    <img src="/images/cards/mastercard.svg" height={20} className='max-h-[32px]' alt="" />
                    <img src="/images/cards/amex.svg" height={20} className='max-h-[32px]' alt="" />
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod
