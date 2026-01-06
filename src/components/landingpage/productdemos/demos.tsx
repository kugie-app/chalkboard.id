import React from "react";
import user1 from "/public/images/profile/user-2.jpg";
import user2 from "/public/images/profile/user-3.jpg";
import user3 from "/public/images/profile/user-4.jpg";
import Image from "next/image";
import * as DemosName from "../Data";
import { Badge, Button } from "flowbite-react";
import Link from "next/link";
import AllDemos from "./AllDemos";
import AllApps from "./AllApps";
import AllFrontPages from "./AllFrontPages";

const ProductDemos = () => {
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
  return (
    <>
      <div className="md:py-20 py-12 relative bg-white dark:bg-dark" id="demos">
        <div className="container">
          <div
            className="lg:w-3/5 w-full mx-auto"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <div className="sm:flex text-center mx-auto block items-center gap-3 justify-center">
              <div className="flex sm:justify-start justify-center">
                {userImg.map((item, index) => (
                  <div className="-ms-2  h-8 w-8" key={index}>
                    <Image
                      src={item.user}
                      className="border-2 border-white dark:border-darkborder rounded-full"
                      alt="icon"
                    />
                  </div>
                ))}
              </div>
              <h5 className="text-base">
                52,589+ developers & agencies using our templates
              </h5>
            </div>
            <h2 className="text-center sm:text-4xl text-2xl mt-8 font-bold sm:!leading-[45px]">
              Production Ready & Developer Friendly Tailwind Nextjs Admin
              Template
            </h2>
          </div>
          {/* Demos */}
          <AllDemos />

          {/* Apps */}
          <div className="mt-12">
            <Badge
              color={"primary"}
              className="mb-5 block mx-auto py-2 px-6 text-base rounded-full"
            >
              Apps
            </Badge>
            <AllApps />
          </div>
          {/* Front Pages */}
          <div className="mt-12">
            <Badge
              color={"primary"}
              className="mb-5 block mx-auto py-2 px-6 text-base rounded-full"
            >
              Frontend Pages
            </Badge>
            <AllFrontPages />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDemos;
