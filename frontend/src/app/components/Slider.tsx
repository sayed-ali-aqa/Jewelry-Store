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
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation"

export default function Slider() {
    const router = useRouter()

    const plugin = React.useRef(
        Autoplay({ delay: 10000, stopOnInteraction: true })
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
                    <div className="w-full h-full relative">
                        <img src={`./images/slider/01.jpg`} className="w-full sliderHeight object-cover object-[70%_30%] md:object-center" alt="Discover Timeless Elegance" />

                        <div className="p-4 absolute top-1/2 translate-none -translate-y-1/2 left-0 md:left-[10%] max-w-[600px]">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">Discover Timeless Elegance</h2>
                            <p className="text-slate-600 text-lg mb-8"> Elevate your style with our exquisite collection of handcrafted jewelry. Each piece is designed to shine with sophistication and grace.</p>
                            <Button size="lg" onClick={() => router.push('/products')}>Shop Now</Button>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem key={2}>
                    <div className="w-full h-full relative">
                        <img src={`./images/slider/02.jpg`} className="w-full sliderHeight object-cover object-center" alt="Luxury That Defines You" />

                        <div className="w-full p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[800px] flex flex-col items-center">
                            <h2 className="text-6xl md:text-7xl font-bold mb-6 text-center text-primary leading-[80px]">Luxury That Defines You</h2>
                            <p className="text-xl font-bold mb-8 text-center text-primary">Explore our exclusive, limited-edition jewelry pieces, crafted with precision and passion. Once they’re gone, they’re gone!</p>
                            <Button className="w-fit bg-white text-black text-md transition-all duration-300 hover:bg-black hover:text-white" size="lg" onClick={() => router.push('/products')}>Shop Now</Button>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem key={3}>
                    <div className="w-full h-full relative">
                        <img src={`./images/slider/03.jpg`} className="w-full sliderHeight object-cover object-[70%_30%] md:object-center" alt="Celebrate love and milestones with jewelry that tells a story." />

                        <div className="p-4 absolute top-1/2 -translate-y-1/2 left-0 md:left-[10%] max-w-[600px] flex flex-col md:block">
                            <span className="block text-lg uppercase text-center md:text-left">The perfect way to say “<span className="text-primary font-bold">I love you.</span>”</span>
                            <h2 className="text-4xl md:text-6xl font-bold my-4 text-primary text-center md:text-left leading-[50px] md:leading-[70px] capitalize">Celebrate love and milestones with jewelry that tells a story.</h2>
                            <Button className="w-fit bg-black text-white text-md mt-10 mx-auto" size="lg" onClick={() => router.push('/products')}>Shop Now</Button>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:block bg-white shadow-sm top-[50%] left-0 h-12 w-12 hover:text-primary hover:bg-white" />
            <CarouselNext className="hidden md:block bg-white shadow-sm top-[50%] -right-[1px] h-12 w-12 hover:text-primary hover:bg-white" />
        </Carousel>
    )
}
