"use client";
import React from "react";
/*--Products Cards Images--*/
import proimg1 from "/public/images/products/s2.jpg";
import proimg2 from "/public/images/products/s5.jpg";
import proimg3 from "/public/images/products/s8.jpg";
import proimg4 from "/public/images/products/s11.jpg";
import Link from "next/link";
import CardBox from "../../shared/CardBox";
import Image from "next/image";
import { Button, Rating } from "flowbite-react";
import { IconBasket } from "@tabler/icons-react";
/*--Products Cards--*/
const productsCardData = [
  {
    title: "Boat Headphone",
    link: "/",
    photo: proimg1,
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: "MacBook Air Pro",
    link: "/",
    photo: proimg2,
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: "Red Valvet Dress",
    link: "/",
    photo: proimg3,
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: "Cute Soft Teddybear",
    link: "/",
    photo: proimg4,
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];

const ProductsCards = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        {productsCardData.map((item, i) => (
          <div className="lg:col-span-3 md:col-span-6 col-span-12" key={i}>
            <Link href={item.link} className="group">
              <CardBox className="p-0 overflow-hidden ">
                <div className="relative">
                  <Image src={item.photo} alt="MatDash" />
                </div>
                <div className="px-6 pb-6">
                  <Button
                    className="h-8 w-8 -mt-6  z-1 ms-auto"
                    color={"primary"}
                  >
                    <IconBasket size={15} />
                  </Button>
                  <h5 className="text-lg mb-1">{item.title}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h6 className="text-h6">${item.price}</h6>
                      <span className="text-sm font-medium line-through text-bodytext">
                        ${item.salesPrice}
                      </span>
                    </div>
                    {item.rating == 5 ? (
                      <Rating size={"sm"}>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                      </Rating>
                    ) : item.rating == 4 ? (
                      <Rating size={"sm"}>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                      </Rating>
                    ) : item.rating == 3 ? (
                      <Rating size={"sm"}>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                        <Rating.Star filled={false} />
                      </Rating>
                    ) : (
                      <Rating size={"sm"}>
                        <Rating.Star />
                        <Rating.Star />
                        <Rating.Star filled={false} />
                        <Rating.Star filled={false} />
                        <Rating.Star filled={false} />
                      </Rating>
                    )}
                  </div>
                </div>
              </CardBox>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsCards;
