"use client";
import React from "react";
import user1 from "/public/images/profile/user-6.jpg";
import user2 from "/public/images/profile/user-2.jpg";
import user3 from "/public/images/profile/user-3.jpg";
import user4 from "/public/images/profile/user-4.jpg";
import Image from "next/image";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";
const Usercards = [
  {
    title: "Andrew Grant",
    subtitle: "3 mutual friends",
    avatar: user1,
    userGroup: [
      {
        icon: user1,
      },
      {
        icon: user2,
      },
      {
        icon: user3,
      },
    ],
  },
  {
    title: "Leo Pratt",
    subtitle: "3 mutual friends",
    avatar: user2,
    userGroup: [
      {
        icon: user1,
      },
      {
        icon: user2,
      },
      {
        icon: user3,
      },
    ],
  },
  {
    title: "Charles Nunez",
    subtitle: "3 mutual friends",
    avatar: user3,
    userGroup: [
      {
        icon: user1,
      },
      {
        icon: user2,
      },
      {
        icon: user3,
      },
    ],
  },
  {
    title: "Lora Powers",
    subtitle: "3 mutual friends",
    avatar: user4,
    userGroup: [
      {
        icon: user1,
      },
      {
        icon: user2,
      },
      {
        icon: user3,
      },
    ],
  },
];

const UserCards = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        {Usercards.map((item, i) => (
          <div className="lg:col-span-3 md:col-span-6 col-span-12" key={i}>
            <CardBox>
              <Image
                src={item.avatar}
                alt="MatDash"
                className="h-20 w-20 rounded-full mb-4"
              />
              <h5 className="text-lg">{item.title}</h5>
              <div className="flex justify-between items-center mb-4">
                <div className="flex ms-2">
                  {item.userGroup.map((user, index) => (
                    <div className="-ms-2  h-8 w-8" key={index}>
                      <Image
                        src={user.icon}
                        className="border-2 border-white dark:border-darkborder rounded-full h-8 w-8"
                        alt="icon"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-daarklink">{item.subtitle}</p>
              </div>
              <div className="flex flex-col gap-4">
                <Button color={"lightprimary"}>Add Freind</Button>
                <Button color={"lightsecondary"}>Remove</Button>
              </div>
            </CardBox>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserCards;
