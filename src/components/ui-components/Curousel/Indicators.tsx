import React from "react";
import IndicatorsCode from "./Code/IndicatorsCode";
import { Carousel } from "flowbite-react";
import CardBox from "../../shared/CardBox";

const Indicators = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Indicators</h4>
          <IndicatorsCode />
        </div>
        <div className="grid h-56 grid-cols-2 gap-4 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel>
            <img src="/images/blog/blog-img1.jpg" alt="..." />
            <img src="/images/blog/blog-img2.jpg" alt="..." />
            <img src="/images/blog/blog-img3.jpg" alt="..." />
            <img src="/images/blog/blog-img4.jpg" alt="..." />
            <img src="/images/blog/blog-img5.jpg" alt="..." />
          </Carousel>
          <Carousel indicators={false}>
            <img src="/images/blog/blog-img1.jpg" alt="..." />
            <img src="/images/blog/blog-img2.jpg" alt="..." />
            <img src="/images/blog/blog-img3.jpg" alt="..." />
            <img src="/images/blog/blog-img4.jpg" alt="..." />
            <img src="/images/blog/blog-img5.jpg" alt="..." />
          </Carousel>
        </div>
      </CardBox>
    </div>
  );
};

export default Indicators;
