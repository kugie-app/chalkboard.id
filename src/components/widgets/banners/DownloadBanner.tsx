import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";
import Image from "next/image";
import Banner from "/public/images/backgrounds/track-bg.png";

const DownloaadBanner = () => {
  return (
    <>
      <CardBox className="bg-lightsecondary dark:bg-lightsecondary shadow-none pb-0 mt-[30px]">
        <div className="grid grid-cols-12 gap-[30px]">
          <div className="md:col-span-6 col-span-12">
            <h5 className="text-lg mt-2">Track your every Transaction Easily</h5>
            <p className="text-dark dark:text-white opacity-75 text-sm font-medium py-5">
            Track and record your every income and expence easily to control your balance
            </p>
            <Button color={'info'}>Download</Button>
          </div>
          <div className="md:col-span-6 col-span-12">
            <Image src={Banner} alt="banner" className="ms-auto" />
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default DownloaadBanner;
