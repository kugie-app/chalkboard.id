import * as React from "react"

import { Card, CardContent } from "@/components/shadcn-ui/Default-Ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn-ui/Default-Ui/carousel"
import CardBox from "../../shared/CardBox"

export function VerticalCarousel() {
  return (
    <CardBox>
    <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Vertical Carousel</h4>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-3 my-16">
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
    </div>
</CardBox>

  )
}
