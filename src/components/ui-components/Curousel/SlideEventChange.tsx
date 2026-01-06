"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Carousel } from "flowbite-react";
import SlideEventCode from "./Code/SlideEventCode";

const SlideEventChange = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Handle Event</h4>
          <SlideEventCode />
        </div>
        <div className="h-56 sm:h-64 xl:h-60">
          <Carousel
            onSlideChange={(index) => console.log("onSlideChange()", index)}
          >
            <div className="flex h-full items-center justify-center bg-muted text-lg font-semibold text-dark dark:bg-dark dark:text-white">
              Slide 1
            </div>
            <div className="flex h-full items-center justify-center bg-muted text-lg font-semibold text-dark dark:bg-dark dark:text-white">
              Slide 2
            </div>
            <div className="flex h-full items-center justify-center bg-muted text-lg font-semibold text-dark dark:bg-dark dark:text-white">
              Slide 3
            </div>
          </Carousel>
        </div>
      </CardBox>
    </div>
  );
};

export default SlideEventChange;
