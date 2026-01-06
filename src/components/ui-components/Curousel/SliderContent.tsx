import React from "react";
import CardBox from "../../shared/CardBox";
import { Carousel } from "flowbite-react";
import SliderContentCode from "./Code/SliderContentCode";

const SliderContent = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Slider Content</h4>
          <SliderContentCode />
        </div>
        <div className="h-56 sm:h-64 xl:h-60">
          <Carousel>
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

export default SliderContent;
