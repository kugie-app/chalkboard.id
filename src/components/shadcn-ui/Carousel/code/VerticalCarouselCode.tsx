import React from 'react'
import CodeModal from '../../CodeModal'

const VerticalCarouselCode = () => {
  return (
    <CodeModal>
        {
            `
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn-ui/Default-Ui/carousel"

<Carousel
    opts={{
    align: "start",
    }}
    orientation="vertical"
    className="w-full max-w-xs"
>
    <CarouselContent className="-mt-1 h-[200px] border-border">
    {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className="pt-1 md:basis-1/2">
        <div className="p-1">
            <Card>
            <CardContent className="flex items-center justify-center p-6">
                <span className="text-3xl font-semibold text-ld">{index + 1}</span>
            </CardContent>
            </Card>
        </div>
        </CarouselItem>
    ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
</Carousel>
            `
        }
    </CodeModal>
  )
}

export default VerticalCarouselCode