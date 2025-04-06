
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    CarouselItem,
} from "@/components/ui/carousel"
import { Star } from "lucide-react"
import Image from "next/image";
import { Review } from "@types/allTypes";

export function ReviewCard({ review }: { review: Review }) {
    return (
        <CarouselItem>
            <Card className="border-none rounded-none">
                <CardContent className="flex items-center p-8 gap-6">
                    <div className="hidden md:block">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${review.image.url}`}
                            alt="Client reivew"
                            width={200}
                            height={260}
                            className='min-w-[200px] h-[260px] object-cover object-center'
                        />
                    </div>

                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <p className="text-slate-500 text-center md:text-left">{review.testimonial}</p>

                        <div className="flex gap-1 text-golden">
                            {Array.from({ length: review.rating }).map((_, index) => (
                                <Star size={20} key={index} />
                            ))}
                        </div>

                        <span className="text-xl font-semibold mt-2">{review.name}</span>
                    </div>
                </CardContent>
            </Card>
        </CarouselItem>
    )
}
