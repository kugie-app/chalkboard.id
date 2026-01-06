"use client";
import React from "react";
import Image from "next/image";
import Logo from "/public/images/logos/logo.svg";
import Link from "next/link";
const FullLogo = () => {
  return (
    <Link href={"/"}>
      <Image src={Logo} alt="logo" className="block rtl:scale-x-[-1]" />
    </Link>
  );
};

export default FullLogo;
