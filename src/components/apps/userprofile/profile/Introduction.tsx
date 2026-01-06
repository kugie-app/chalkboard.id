import CardBox from "@/components/shared/CardBox";
import { Icon } from "@iconify/react";
import React from "react";

const Introduction = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title">Introduction</h5>
        <p className="card-subtitle">
          Hello, I am David McMichael. I love making websites and graphics. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 items-center">
            <Icon icon="solar:money-bag-outline" height="20" className="text-ld" />
            <p className="text-ld font-semibold">Sir, P P Institute Of Science</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon icon="solar:mailbox-outline" height="20" className="text-ld" />
            <p className="text-ld font-semibold">xyzjonathan@gmail.com</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon icon="solar:monitor-line-duotone" height="20" className="text-ld" />
            <p className="text-ld font-semibold">www.xyz.com</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon icon="solar:map-point-outline" height="20" className="text-ld" />
            <p className="text-ld font-semibold">Newyork, USA - 100001</p>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default Introduction;
