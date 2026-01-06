"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "flowbite";
import { Button, Navbar } from "flowbite-react";
import FullLogo from "@/components/layout/shared/logo/FullLogo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

const FrontHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={` top-0 z-50 ${
          isSticky
            ? "bg-white dark:bg-dark shadow-md fixed w-full py-5"
            : "bg-lightgray dark:bg-darkgray lg:py-9 py-5 "
        }`}
      >
       
        <div className="container-1218 mx-auto  flex justify-between items-center">
          <FullLogo />
          {/* <MobileDrawer/> */}
          <div className="xl:block hidden">
            <Navigation />
          </div>
          <Button as={Link} href="/auth/auth2/login" className="font-bold xl:flex hidden" color={"sky"}>
            Log in
          </Button>
          <MobileMenu/>
        </div>
      </header>
    </>
  );
};

export default FrontHeader;
