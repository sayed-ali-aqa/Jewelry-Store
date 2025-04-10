import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const LanguageSelect = () => {
    return (
        <Select>
            <SelectTrigger className="w-[95px] border-none shadow-none text-white outline-none focus:ring-0 font-semibold">
                <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="English" className='focus:bg-white focus:text-primary'>English</SelectItem>
                <SelectItem value="French" className='focus:bg-white focus:text-primary'>French</SelectItem>
                <SelectItem value="German" className='focus:bg-white focus:text-primary'>German</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default LanguageSelect