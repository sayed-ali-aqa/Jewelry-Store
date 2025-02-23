"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { ReviewCard } from "./ReviewCard"

export function Reviews() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <section className="bg-slate-50 px-4 py-12 mt-10">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-4xl font-semibold text-center mb-8">Customers Reviews</h1>

                <Carousel plugins={[plugin.current]} setApi={setApi} className="w-full max-w-4xl">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <ReviewCard key={index} />
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex bg-white -left-4 border-none shadow-sm h-10 w-10 hover:bg-white hover:text-primary"/>
                    <CarouselNext className="hidden md:flex bg-white -right-4 border-none shadow-sm h-10 w-10 hover:bg-white hover:text-primary"/>
                </Carousel>
                <div className="py-2 text-center text-md text-muted-foreground">
                    Review {current} of {count}
                </div>
            </div>
        </section>
    )
}
