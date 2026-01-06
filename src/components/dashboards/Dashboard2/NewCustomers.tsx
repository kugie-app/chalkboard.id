"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import { Progress } from "flowbite-react";

const NewCustomers = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center gap-3">
          <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center bg-lightsecondary rounded-tw">
            <Icon
              icon="solar:football-outline"
              className="text-secondary"
              height={24}
            />
          </span>
          <span className="font-medium text-base text-ld">New Customers</span>
        </div>
        <div className="flex justify-between items-center mt-8">
          <span className="text-ld text-15 font-medium">New goals</span>
          <span className="text-ld text-15 font-medium">83%</span>
        </div>
        <Progress progress={45} color="secondary" />
      </CardBox>
    </>
  );
};

export default NewCustomers;
