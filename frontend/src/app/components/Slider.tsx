"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function Slider() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="sliderHeight w-full overflow-x-hidden"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full h-full">
                            <img src={`./images/slider/0${index+1}.jpg`} className="w-full sliderHeight object-cover object-center" alt="" />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white shadow-sm top-[50%] left-0 h-12 w-12 hover:text-primary hover:bg-white" />
            <CarouselNext className="bg-white shadow-sm top-[50%] right-0 h-12 w-12 hover:text-primary hover:bg-white" />
        </Carousel>
    )
}
