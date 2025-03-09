
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductsProps } from '@types/allTypes'

const BreadCrumb: React.FC<ProductsProps> = ({ current, visitedLinks }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {visitedLinks.map((item, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </div>
                ))}

                <BreadcrumbItem>
                    <BreadcrumbPage className='text-black'>{current}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumb