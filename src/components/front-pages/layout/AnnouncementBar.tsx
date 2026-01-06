import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";

const AnnouncementBar = () => {
  // State to control the visibility of the div
  const [isVisible, setIsVisible] = useState(true);

  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible && (
        <div className="bg-sky py-2 overflow-hidden relative  before:absolute before:left-0 before:lg:inline-block before:lg:none before:hidden before:content-[''] before:bg-[url('/images/front-pages/background/left-shape.png')] before:bg-no-repeat before:bg-contain before:top-0  before:w-[325px] before:h-[50px]   after:absolute after:end-1/4 after:lg:inline-block after:lg:none after:hidden after:content-[''] after:bg-[url('/images/front-pages/background/right-shape.png')] after:bg-no-repeat after:bg-contain after:top-0  after:w-[325px] after:h-[50px]">
          <div className="flex justify-center gap-4 items-center ">
            <Link
              href="/"
              className="py-1 px-2 rounded-[8px] bg-lightbtn text-xs font-bold text-white"
            >
              New
            </Link>
            <p className="text-13 font-medium text-white opacity-80">
              Frontend Pages Added
            </p>
            <Link href={"#"} onClick={toggleVisibility} className="absolute end-4">
              <Icon
                icon="solar:close-circle-outline"
                className="text-secondary "
                height={24}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementBar;
