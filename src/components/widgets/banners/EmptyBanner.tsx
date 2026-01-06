import React from "react";
import CardBox from "../../shared/CardBox";
import Banner from "/public/images/products/empty-shopping-bag.gif";
import Image from "next/image";
import { Button } from "flowbite-react";
const EmptyBanner = () => {
  return (
    <>
      <CardBox>
        <Image src={Banner} alt="banner" className="mx-auto  w-48" />
        <div className="text-center mx-auto">
          <h5 className="text-lg">Oop, Your cart is empty!</h5>
          <p className="text-bodytext mt-2">
          Get back to shopping and get rewards from it.
          </p>
          <div className="flex justify-center mt-5">
            <Button color={"primary"}>Go for shopping</Button>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default EmptyBanner;
