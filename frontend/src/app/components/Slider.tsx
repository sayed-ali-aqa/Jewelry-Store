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
                <CarouselItem key={1}>
                    <div className="w-full h-full">
                        <img src={`./images/slider/01.jpg`} className="w-full sliderHeight object-cover object-[70%_30%] md:object-center" alt="" />
                    </div>
                </CarouselItem>

                <CarouselItem key={2}>
                    <div className="w-full h-full">
                        <img src={`./images/slider/02.jpg`} className="w-full sliderHeight object-cover object-center" alt="" />
                    </div>
                </CarouselItem>

                <CarouselItem key={3}>
                    <div className="w-full h-full">
                        <img src={`./images/slider/03.jpg`} className="w-full sliderHeight object-cover object-[75%_25%] md:object-[60%_40%] lg:object-center" alt="" />
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-white shadow-sm top-[50%] left-0 h-12 w-12 hover:text-primary hover:bg-white" />
            <CarouselNext className="bg-white shadow-sm top-[50%] right-0 h-12 w-12 hover:text-primary hover:bg-white" />
        </Carousel>
    )
}
