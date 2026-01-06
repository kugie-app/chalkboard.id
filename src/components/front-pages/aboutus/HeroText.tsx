import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

const HeroText = () => {
  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray">
        <div className="container-1218 mx-auto md:py-14 py-7">
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-6 col-span-12 lg:text-start text-center">
              <h1 className="xl:text-5xl text-4xl text-darklink dark:text-white xl:leading-[64px] leading-[50px] font-normal">
                <b>Get to know MatDash</b>
                <br></br>
                Dashboard Template
              </h1>
              <div className="sm:flex lg:justify-start justify-center gap-5 py-6">
                <Button
                  color={"primary"}
                  as={Link}
                  href="/auth/auth2/register"
                  className="px-4 font-bold sm:w-fit w-full"
                >
                  Create an Account
                </Button>
                <Button
                  color={"outlineprimary"}
                  as={Link}
                  href="/"
                  className="px-4 font-bold sm:w-fit w-full sm:mt-0 mt-4"
                >
                  View Open Positions
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 lg:text-left text-center">
                <p className="text-base text-ld opacity-90 leading-8 xl:ps-20 pt-4">Do you need a highly customizable and developer friendly premium Nextjs admin template packed with numerous features? <b className="opacity-100">MatDash Nextjs Admin</b> template has everything you need. This Nextjs based admin template is designed in accordance with industry standards and best practices to provide you.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroText;
