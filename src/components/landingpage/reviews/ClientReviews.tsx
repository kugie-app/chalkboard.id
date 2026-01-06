"use client";
import Slider from "react-slick";
import * as ClientRev from "../Data";
import React from "react";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBox from "../../shared/CardBox";
import { Rating } from "flowbite-react";

const ClientReviews = () => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    swipeToSlide: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="bg-white dark:bg-dark">
        <div className="container md:py-20 py-12 ">
          <div
            className="lg:w-3/5 w-full mx-auto"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <h2
              className="text-center sm:text-4xl text-2xl mt-8 font-bold sm:!leading-[45px]"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              Don’t just take our words for it, See what developers like you are
              saying
            </h2>
          </div>
          <div
            className="slider-container client-reviews pt-14"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            {/* @ts-ignore - Slider component compatibility with React 19 */}
            <Slider {...settings}>
              {ClientRev.userReview.map((item, index) => (
                <div key={index}>
                  <CardBox className="bg-lightgray">
                    <div className="flex justify-between">
                      <div className="flex gap-3 items-center">
                        <Image
                          src={item.img}
                          alt="review"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <h6 className="text-base">{item.title}</h6>
                          <p className="text-sm text-ld opacity-80">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <Rating size={"sm"}>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                        </Rating>
                      </div>
                    </div>
                    <p className="text-sm text-ld opacity-90 pt-4">
                      {item.review}
                    </p>
                  </CardBox>
                </div>
              ))}
            </Slider>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default ClientReviews;
