import React from "react";
import CardBox from "../../shared/CardBox";
import Banner from "/public/images/backgrounds/website-under-construction.svg";
import Image from "next/image";
import { Button } from "flowbite-react";
const ErroreBanner = () => {
  return (
    <>
      <CardBox>
        <Image src={Banner} alt="banner" className="mx-auto  w-48" />
        <div className="text-center mx-auto">
          <h5 className="text-lg">Oops something went wrong!</h5>
          <p className="text-bodytext mt-2 md:px-12">
            Trying again to bypasses these temporary error.
          </p>
          <div className="flex justify-center mt-3">
            <Button color={"error"}>Retry</Button>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default ErroreBanner;
