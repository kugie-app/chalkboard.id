"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { IconGift } from "@tabler/icons-react";
import Image from "next/image";
import img1 from "/public/images/products/s1.jpg";
import img2 from "/public/images/products/s2.jpg";
import { Button } from "flowbite-react";

const GiftCards = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="sm:col-span-6 col-span-12">
          <CardBox>
            <div className="flex items-center justify-between">
              <h5 className="card-title">Andrew Grant</h5>
              <IconGift className="text-primary" size={20} />
            </div>
            <Image src={img1} alt="maaterialm" className="rounded-lg w-full object-cover h-[150px]" />
            <Button color={'primary'} className="mt-4">Gift to Friend ($50.00)</Button>
          </CardBox>
        </div>
        <div className="sm:col-span-6 col-span-12">
          <CardBox>
            <div className="flex items-center justify-between">
              <h5 className="card-title">Leo Pratt </h5>
              <IconGift className="text-primary" size={20} />
            </div>
            <Image src={img2} alt="maaterialm" className="rounded-lg w-full object-cover h-[150px]"  />
            <Button color={'primary'} className="mt-4">Gift to Friend ($50.00)</Button>
          </CardBox>
        </div>
      </div>
    </>
  );
};

export default GiftCards;
