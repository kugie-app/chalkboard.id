import React from 'react'
import CodeModal from '../../CodeModal'

const BasicCarouselCode = () => {
  return (
    <CodeModal>
        {
            `
import { Card, CardContent } from "@/components/shadcn-ui/Default-Ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/shadcn-ui/Default-Ui/carousel"
 
<Carousel className="w-full max-w-xs">
    <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
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
    <CarouselPrevious className='text-primary' />
    <CarouselNext />
</Carousel>
            `
        }
    </CodeModal>
  )
}

export default BasicCarouselCode