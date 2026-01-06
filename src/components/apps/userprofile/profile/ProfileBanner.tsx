import React from "react";
import {
  TbBrandDribbble,
  TbBrandFacebook,
  TbBrandYoutube,
  TbFileDescription,
  TbUserCheck,
  TbUserCircle,
} from "react-icons/tb";
import CardBox from "@/components/shared/CardBox";
import Image from "next/image";
import Banner from "/public/images/backgrounds/profilebg.jpg";
import Link from "next/link";
import { Button } from "flowbite-react";
import ProfileTab from "./ProfileTab";

const ProfileBanner = () => {
  return (
    <>
      <CardBox className="p-0 overflow-hidden">
        <Image
          src={Banner}
          alt="priofile banner"
          className="w-full"
          height={330}
        />
        <div className="bg-white dark:bg-dark p-6 -mt-2">
          <div className="grid grid-cols-12 gap-3">
            <div className="lg:col-span-4 col-span-12 lg:order-1 order-2">
              <div className="flex gap-6 items-center justify-around lg:py-0 py-4">
                <div className="text-center">
                  <TbFileDescription
                    className="block mx-auto text-ld opacity-50 "
                    size="20"
                  />
                  <h4 className="text-xl">938</h4>
                  <p className="text-darklink dark:text-bodytext text-sm">Posts</p>
                </div>
                <div className="text-center">
                  <TbUserCircle
                    className="block mx-auto text-ld opacity-50"
                    size="20"
                  />
                  <h4 className="text-xl">3,586</h4>
                  <p className="text-darklink dark:text-bodytext text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <TbUserCheck
                    className="block mx-auto text-ld opacity-50"
                    size="20"
                  />
                  <h4 className="text-xl">2,659</h4>
                  <p className="text-darklink dark:text-bodytext text-sm">Following</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:order-2 order-1">
              <div className="text-center -mt-20">
                <Image
                  src="/images/profile/user-1.jpg"
                  alt="profile"
                  height="100"
                  width="100"
                  className="rounded-full mx-auto border-4 border-white dark:border-darkborder"
                />
                <h5 className="text-lg mt-3">David McMichael</h5>
                <p className="text-darklink dark:text-bodytext">Designer</p>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12 lg:order-3 order-3">
              <div className="flex items-center gap-3.5 lg:justify-end justify-center h-full xl:pe-4">
                <Button as={Link} href={''} className="h-9 w-9 rounded-full p-0" color={'primary'}><TbBrandFacebook size={20} /></Button>
                <Button as={Link} href={''} className="h-9 w-9 rounded-full p-0" color={'secondary'}><TbBrandDribbble size={20} /></Button>
                <Button as={Link} href={''} className="h-9 w-9 rounded-full p-0" color={'error'}><TbBrandYoutube size={20} /></Button>
                <Button color={'primary'}>Add To Story</Button>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Tabs */}
        <ProfileTab />
      </CardBox>
    </>
  );
};

export default ProfileBanner;
