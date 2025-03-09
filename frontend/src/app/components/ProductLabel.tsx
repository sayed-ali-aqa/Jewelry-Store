import { ProductLableProps } from '@types/allTypes'
import React from 'react'

const ProductLabel: React.FC<ProductLableProps> = ({ label, className }) => {
    return (
        <div className={`top-4 w-fit bg-black text-sm px-3 py-1 text-slate-100 uppercase z-100 ${className}`}> {label}</div >
    )
}

export default ProductLabel