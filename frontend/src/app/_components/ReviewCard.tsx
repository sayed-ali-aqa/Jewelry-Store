
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    CarouselItem,
} from "@/components/ui/carousel"
import { Star } from "lucide-react"

export function ReviewCard() {
    return (
        <CarouselItem>
            <Card className="border-none rounded-none">
                <CardContent className="flex items-center p-8 gap-6">
                    <div className="hidden md:block">
                        <img
                            src="/images/products/01.jpg" alt="Review -1"
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <p className="text-slate-500 text-lg text-center md:text-left">I had an amazing experience shopping! The jewelry pieces are absolutely stunning, and the quality exceeded my expectations. The website is easy to navigate, and the checkout process was seamless.</p>

                        <div className="flex gap-1 text-orange-300">
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                        </div>

                        <span className="text-xl font-semibold mt-2">Brnada Smith</span>
                    </div>
                </CardContent>
            </Card>
        </CarouselItem>
    )
}
