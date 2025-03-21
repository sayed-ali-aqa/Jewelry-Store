"use client"
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"

const ProductsFilterCheckbox = ({ category, index }: { category: string, index: number }) => {
    const [isChecked, setIsChecked] = React.useState(false);

    return (
        <div className="items-top flex space-x-3 items-center">
            <Checkbox
                id={`category${index}`}
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked === true)}
            />
            <label
                htmlFor={`category${index}`}
                className={`${isChecked ? 'text-black' : 'text-slate-500'} cursor-pointer select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
            >
                {category}
            </label>
        </div>
    )
}

export default ProductsFilterCheckbox