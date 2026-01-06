"use client";
import React from "react";
import OutlineCard from "../../shared/OutlineCard";
import { Button } from "flowbite-react";
import CardBox from "../../shared/CardBox";
import { IconDeviceDesktop, IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from "@tabler/icons-react";

const SecurityTab = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="lg:col-span-8 col-span-12">
          <OutlineCard className="shadow-none">
            <h5 className="card-title mb-1">Two-factor Authentication</h5>
            <div className="flex gap-4 items-center mb-4">
              <div className="lg:flex gap-4 ">
                <p className="card-subtitle">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corporis sapiente sunt earum officiis laboriosam ut.
                </p>
                <Button color={"primary"} className="lg:mt-0 mt-3">Enable</Button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-ld pt-4">
              <div className="">
                <h6 className="text-base">Authentication App</h6>
                <p className="text-sm text-bodytext">Google auth app</p>
              </div>
              <Button color={"lightprimary"}>Setup</Button>
            </div>
            <div className="flex items-center justify-between border-t border-ld pt-4 mt-3">
              <div className="">
                <h6 className="text-base">Another e-mail</h6>
                <p className="text-sm text-bodytext">
                  E-mail to send verification link
                </p>
              </div>
              <Button color={"lightprimary"}>Setup</Button>
            </div>
            <div className="flex items-center justify-between border-t border-ld pt-4 mt-3">
              <div className="">
                <h6 className="text-base">SMS Recovery</h6>
                <p className="text-sm text-bodytext">
                  Your phone number or something
                </p>
              </div>
              <Button color={"lightprimary"}>Setup</Button>
            </div>
          </OutlineCard>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <CardBox>
            <div className="flex justify-center h-12 w-12 rounded-md bg-muted dark:bg-darkmuted items-center text-dark dark:text-white">
              <IconDeviceLaptop className="text-primary" />
            </div>
            <h5 className="text-lg mt-1">Devices</h5>
            <p className="text-sm text-bodytext -mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
            </p>
            <Button color={"primary"} className="w-fit mt-3">
              Sign out from all devices
            </Button>

            <div className="flex gap-3.5 items-center mt-6">
              <IconDeviceMobile className="text-dark dark:text-white"  />
              <div>
                <h6 className="text-base">iPhone 14</h6>
                <p className="text-sm text-bodytext">London UK, Oct 23 at 1:15 AM</p>
              </div>
              <IconDotsVertical size={18} className="cursor-pointer ms-auto text-dark dark:text-white" />
            </div>
            <div className="flex gap-3.5 items-center border-t border-ld mt-2 pt-3">
              <IconDeviceDesktop className="text-dark dark:text-white"  />
              <div>
                <h6 className="text-base">Macbook Air</h6>
                <p className="text-sm text-bodytext">Gujarat India, Oct 24 at 3:15 AM</p>
              </div>
              <IconDotsVertical size={18} className="cursor-pointer ms-auto text-dark dark:text-white" />
            </div>
            <Button color={'lightprimary'} className="mt-3">Need Help?</Button>
          </CardBox>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-7">
        <Button color={"primary"}>Save</Button>
        <Button color={"lighterror"}>Cancel</Button>
      </div>
    </>
  );
};

export default SecurityTab;
