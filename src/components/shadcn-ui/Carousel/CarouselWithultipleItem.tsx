import React from 'react'
import CardBox from '../../shared/CardBox'
import { Card, CardContent } from "@/components/shadcn-ui/Default-Ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/shadcn-ui/Default-Ui/carousel"
import CarouselMultipleItemCode from './code/CarouselMultipleItemCode'


const CarouselWithultipleItem = () => {
  return (
    <CardBox>
    <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Carousel With Multiple Item</h4>
        <CarouselMultipleItemCode/>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <Carousel className="w-full max-w-xs" >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className='border-border'>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-4xl text-ld font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
</CardBox>
  )
}

export default CarouselWithultipleItem