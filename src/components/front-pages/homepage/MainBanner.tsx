import React from "react";
import user1 from "/public/images/profile/user-2.jpg";
import user2 from "/public/images/profile/user-3.jpg";
import user3 from "/public/images/profile/user-4.jpg";

import tech1 from "/public/images/front-pages/technology/react.svg";
import tech2 from "/public/images/front-pages/technology/flowbite.svg";
import tech3 from "/public/images/front-pages/technology/nextjs.svg";
import tech4 from "/public/images/front-pages/technology/typescript.svg";
import tech5 from "/public/images/front-pages/technology/tailwind.svg";
import tech6 from "/public/images/front-pages/technology/headless-ui.svg";
import tech7 from "/public/images/front-pages/technology/shadcn.svg";
import mainbanner from "/public/images/front-pages/background/main-banner.png";
import Image from "next/image";
import { Button, Tooltip } from "flowbite-react";
import Link from "next/link";

const MainBanner = () => {
  const userImg = [
    {
      user: user1,
    },
    {
      user: user2,
    },
    {
      user: user3,
    },
  ];

  const Technology = [
    {
      tech: tech1,
      tooltip: "React",
    },
    {
      tech: tech2,
      tooltip: "Flowbite React",
    },
    {
      tech: tech3,
      tooltip: "Next.js",
    },
    {
      tech: tech4,
      tooltip: "Typescript",
    },
    {
      tech: tech5,
      tooltip: "Tailwind css",
    },
    {
      tech: tech6,
      tooltip: "Headless Ui",
    },
    {
      tech: tech7,
      tooltip: "Shadcn Ui",
    },
  ];
  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray">
        <div className="container-1218 mx-auto sm:pt-10 pt-6 xl:pb-0 pb-10">
          <div className="grid grid-cols-12 gap-30 flex items-center ">
            <div className="xl:col-span-6 col-span-12 lg:text-start text-center">
              <h1 className="lg:text-56 text-4xl text-darklink dark:text-white lg:leading-[64px] leading-[50px]">
                <b>A feature-packed dashboard</b> built for developers' needs.
              </h1>
              <div className="sm:flex text-center mx-auto block items-center gap-3 lg:justify-start justify-center py-6">
                <div className="flex flex-row-reverse lg:justify-start justify-center ps-3">
                  {userImg.map((item, index) => (
                    <div className="-ms-3 h-10 w-10 relative z-5" key={index}>
                      <Image
                        src={item.user}
                        className="border-2 border-white dark:border-darkborder rounded-full"
                        alt="icon"
                      />
                    </div>
                  ))}
                </div>
                <h5 className="text-17 text-ld font-medium opacity-80 md:pt-0 pt-3">
                  52,589+ developers & agencies using our templates
                </h5>
              </div>
              <ul className="flex flex-wrap lg:justify-start justify-center gap-5 pb-7 md:pt-4 ml-0">
                {Technology.map((item, index) => (
                  <Tooltip
                    key={index}
                    content={item.tooltip}
                    className="!text-xs"
                    placement="bottom"
                  >
                    <li
                      key={index}
                      className="md:h-14 md:w-14 h-10 w-10 bg-white dark:bg-darkmuted rounded-[16px] flex justify-center items-center shadow-elevation1"
                    >
                      <Image src={item.tech} alt="icon" height={28} className="md:h-7 h-5" />
                    </li>
                  </Tooltip>
                ))}
              </ul>
              <div className="flex lg:justify-start justify-center">
                <Button
                  color={"primary"}
                  as={Link}
                  href="/auth/auth2/login"
                  className="px-4 font-bold sm:w-fit w-full"
                >
                  Log in
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 xl:block hidden">
              <div className="min-w-[1300px] max-h-[700px] h-[calc(100vh_-_100px)] overflow-hidden ">
                <Image src={mainbanner} className="rtl:scale-x-[-1]" alt="banner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
