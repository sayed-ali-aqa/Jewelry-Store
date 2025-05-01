"use client"

import React from 'react'
import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { ShippingMethodProps } from '@types/allTypes'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { shippingOptions } from '../../../../../datalist'
import { getShippingMethodValue } from '@utils/functions/checkout'

const ShippingMethod: React.FC<ShippingMethodProps> = ({
    errors,
    control,
    setSelectedShippingMethodValue,
}) => {

    const handleShippingMethodChange = (value: string) => {
        const selectedMethodValue = getShippingMethodValue(value)
        setSelectedShippingMethodValue(selectedMethodValue)
    }

    return (
        <div className='bg-white py-6 flex flex-col gap-6'>
            <h2 className='text-2xl mx-6'>Shipping Methods</h2>

            <Controller
                name="shippingMethod"
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        value={field.value}
                        onValueChange={(val) => {
                            field.onChange(val)
                            handleShippingMethodChange(val)
                        }}
                    >
                        {shippingOptions.map((item, index) => (
                            <Label
                                key={index}
                                htmlFor={item.method}
                                className="py-3 px-6 flex items-center justify-between space-x-2 transition-all duration-300 cursor-pointer hover:bg-slate-100"
                            >
                                <div>
                                    <h3 className="text-lg">{item.method}</h3>
                                    <p className="text-slate-600 font-medium">{item.method === "Free" ? "Same day" : `${item.minDuration} - ${item.maxDuration} business days`}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-lg">${item.price.toFixed(2)}</span>
                                    <RadioGroupItem value={item.method} id={item.method} />
                                </div>
                            </Label>
                        ))}
                    </RadioGroup>
                )}
            />
            {errors.shippingMethod && <p className="text-red-500 text-sm px-6">{errors.shippingMethod.message}</p>}
        </div>
    )
}

export default ShippingMethod
