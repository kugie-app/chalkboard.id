import Image from "next/image";
import React from "react";
import Banner from "/public/images/landingpage/background/c2a.png";
import Link from "next/link";
import { Button } from "flowbite-react";
const LoginReg = () => {
  return (
    <div className="bg-white dark:bg-dark lg:pt-20 pt-8">
      <div className="bg-primary overflow-hidden ">
        <div className="container">
          <div className="lg:flex justify-between items-center">
            <div className="lg:w-1/2 lg:text-start text-center">
              <h2 className="font-bold lg:text-4xl text-3xl text-white mb-7 lg:pt-0 pt-10 sm:!leading-[50px]">
                Build your app with our highly customizable Tailwind based
                Dashboard
              </h2>
              <div className="sm:flex lg:justify-start justify-center gap-4">
                <Button
                  as={Link}
                  href="/auth/auth2/login"
                  color={"white"}
                  className="mb-3 sm:mb-0 px-0"
                  size={"lg"}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href="/auth/auth2/register"
                  color={"outlinewhite"}
                  size={"lg"}
                  className="px-0"
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="lg:w-[30%]">
              <div className="flex lg:justify-end justify-center">
                <Image
                  src={Banner}
                  alt="matdash"
                  className="w-auto lg:ms-auto  pt-7"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginReg;
