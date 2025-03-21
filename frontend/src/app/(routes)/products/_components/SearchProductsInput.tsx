"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input"
import { Pen, Search, X } from 'lucide-react';

const SearchProductsInput = () => {
    const searchParams = useSearchParams();

    const updateSearchQuery = (value: string) => {
        const params = new URLSearchParams(window.location.search);

        if (value.trim()) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        // Update the browser’s URL without reloading the page by replacing the current URL.
        window.history.replaceState(null, '', '?' + params.toString());
    };

    return (
        <div className='relative'>
            <Input
                className='border-slate-300 border-[1px] shadow-none h-11 w-full'
                type="text"
                value={searchParams.get('search') || ''}
                onChange={(e) => updateSearchQuery(e.target.value)}
                placeholder='Search here'
            />

            {
                searchParams.get('search')?.trim() ? (
                    <X
                        size={18}
                        onClick={() => updateSearchQuery('')}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 transition-transform cursor-pointer hover:text-destructive"
                    />
                ) : (
                    <Search
                        size={18}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 transition-transform"
                    />
                )
            }


        </div>
    )
}

export default SearchProductsInput