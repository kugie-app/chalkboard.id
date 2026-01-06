"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import BgImg from "/public/images/backgrounds/welcome-bg2.png";
import Image from "next/image";
const GradientBox = () => {
  return (
    <>
      <CardBox className="bg-gradient-to-l from-primary to-[#5a52ff] relative overflow-hidden shadow-none">
        <div className="bg-black/10 px-3 py-1.5 rounded-md w-fit">
          <div className="flex items-center gap-2 text-white">
            <Icon icon="solar:check-circle-outline" height={18} />
            This month <span className="font-semibold">+15% Profit</span>
          </div>
        </div>
        <div className="pt-20 relative z-[1]">
          <h5 className="text-22 text-white">
            Hey,<span className="font-bold">David McMichael</span>
          </h5>
          <p className="font-normal opacity-75 text-white text-15 mt-3">
            Aenean vel libero id metus sollicitudin
          </p>
        </div>
        <Image
          src={BgImg}
          alt="background"
          className="absolute bottom-0 end-0 rtl:scale-x-[-1]"
        />
      </CardBox>
    </>
  );
};

export default GradientBox;
