"use client";
import {
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import img1 from "/public/images/blog/blog-img8.jpg";
import img2 from "/public/images/blog/blog-img9.jpg";
import img3 from "/public/images/blog/blog-img7.jpg";
import CardBox from "../../shared/CardBox";
/*--Music Cards--*/
const musicCard = [
  {
    title: "Uptown Funk",
    subheader: "Jon Bon Jovi",
    img: img1,
  },
  {
    title: "Blank Space",
    subheader: "Madonna",
    img: img2,
  },
  {
    title: "Lean On",
    subheader: "Jennifer Lopez",
    img: img3,
  },
];

const MusicCards = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        {musicCard.map((item, i) => (
          <div className="lg:col-span-4 col-span-12" key={i}>
            <CardBox className="overflow-hidden p-0">
              <div className="grid grid-cols-12 gap-[30px]">
                <div className="col-span-6 p-6">
                  <h5 className="text-lg ">{item.title}</h5>
                  <p className="text-bodytext">{item.subheader}</p>
                  <div className="flex justify-between items-center pt-12 cursor-pointer" >
                    <IconPlayerSkipBack size={18} />
                    <IconPlayerPlay className="text-error" size={18} />
                    <IconPlayerSkipForward size={18} />
                  </div>
                </div>
                <div className="col-span-6">
                  <Image src={item.img} alt="MatDash" className="h-full object-cover" />
                </div>
              </div>
            </CardBox>
          </div>
        ))}
      </div>
    </>
  );
};

export default MusicCards;
