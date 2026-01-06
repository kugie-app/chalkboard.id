

"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
// Carousel slider for product
import Slider from "react-slick";

// Carousel slider data
import SliderData from "./SliderData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ProductContext } from '@/app/context/Ecommercecontext/index';
import { useParams } from 'next/navigation';

import Image from "next/image";

const ProductCarousel = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const { id } = useParams();
  const { products } = useContext(ProductContext);
  // Find the product by Id
  const product = products.find((p) => p.id === Number(id));
  const getProductImage = product ? product.photo : '';

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 6,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: false,
    className: "centerThumb",
    speed: 500,
  };

  return (
    <>
      <div className="product">
        {/* @ts-ignore - Slider component compatibility with React 19 */}
        <Slider
          asNavFor={nav2 || undefined}
          ref={sliderRef1}
          arrows={false}
        >
          <Image
            src={getProductImage}
            alt="Main Product"
            width={500}
            height={500}
          />
          {SliderData.map((items, index) => (
            <div key={index}>
              <Image
                src={items.imgPath}
                width={500}
                height={500}
                alt="carousel"
                className="rounded-md"
              />
            </div>
          ))}
        </Slider>
        {/* @ts-ignore - Slider component compatibility with React 19 */}
        <Slider
          asNavFor={nav1 || undefined}
          ref={sliderRef2}
          {...settings}
          className="mt-2 product-thumb"
        >
          <div className="cursor-pointer p-2">
            <Image
              src={getProductImage}
              alt="Thumbnail"
              width={72}
              height={72}
              className="rounded-md"
            />
          </div>
          {SliderData.map((items, index) => (
            <div key={index} className="cursor-pointer p-2">
              <Image
                src={items.imgPath}
                alt={`Thumbnail ${items.id}`}
                width={72}
                height={72}
                className="rounded-md"
              />
            </div>
          ))}
        </Slider >
      </div >
    </>
  );
};

export default ProductCarousel;



