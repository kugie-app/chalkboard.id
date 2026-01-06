import React from "react";
import CardBox from "../../shared/CardBox";
import Image from "next/image";
import BgImg from "/public/images/backgrounds/blog.jpg";
import user1 from "/public/images/profile/user-4.jpg";
import user2 from "/public/images/profile/user-2.jpg";
import user3 from "/public/images/profile/user-3.jpg";
import user4 from "/public/images/profile/user-6.jpg";

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
  {
    user: user4,
  },
];
const FigmaCard = () => {
  return (
    <>
      <CardBox className="overflow-hidden p-0">
        <Image src={BgImg} alt="matdash" />
        <div className="p-30 pt-5">
          <h6 className="text-base">Figma tips and tricks with Stephan</h6>
          <p className="text-15 text-ld opacity-80 mt-3 leading-7">
            Nullam lobortis sodales dolor vitae viverra.<br></br>Cras lacinia
            bibendum metus vel rhoncus.
          </p>
          <div className="flex mt-4">
            {userImg.map((item, index) => (
              <div className="-ms-2  h-11 w-11" key={index}>
                <Image
                  src={item.user}
                  className="border-2 border-white dark:border-darkborder rounded-full"
                  alt="icon"
                />
              </div>
            ))}
            <div className="-ms-2 ">
              <div className="bg-lightprimary border-2 border-white dark:border-darkborder  h-11 w-11 flex justify-center items-center text-primary rounded-full dark:bg-lightprimary">
                +12
              </div>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default FigmaCard;
