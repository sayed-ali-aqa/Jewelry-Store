import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function CartQuantitySelect() {
    return (
        <Select>
            <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="1" className='transition-all duration-300 hover:bg-slate-200'>1</SelectItem>
                    <SelectItem value="2" className='transition-all duration-300 hover:bg-slate-200'>2</SelectItem>
                    <SelectItem value="3" className='transition-all duration-300 hover:bg-slate-200'>3</SelectItem>
                    <SelectItem value="4" className='transition-all duration-300 hover:bg-slate-200'>4</SelectItem>
                    <SelectItem value="5" className='transition-all duration-300 hover:bg-slate-200'>5</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
