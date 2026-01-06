"use client";
import { IconChevronRight } from "@tabler/icons-react";
import { link } from "fs";
import Link from "next/link";
import React, { useContext } from "react";

interface BreadCrumbType {
  title: string;
  link?: string;
}

const FrontEndBreadcrumb = ({ title, link }: BreadCrumbType) => {
  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray sm:pb-14 pb-8">
        <div className="container-1218 mx-auto md:pt-14 pt-7 ">
          <div className="flex sm:justify-between justify-center  items-center flex-wrap">
            <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white text-center">
              {title}
            </h2>
            <div className="flex  items-center gap-4 uppercase text-sm font-bold md:mt-0 mt-4">
              <span className="text-ld opacity-80">matdash</span>
              <IconChevronRight size={15} />{" "}
              <Link href={"/"} className="text-primary">
                {link}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontEndBreadcrumb;
