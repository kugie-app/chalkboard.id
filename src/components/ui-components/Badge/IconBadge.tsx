import React from "react";
import CardBox from "../../shared/CardBox";
import IconCode from "./Code/IconCode";
import { Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";
const IconBadge = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Icon Badges</h4>
          <IconCode />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge color="primary" icon={HiCheck} />
          <Badge color="secondary" icon={HiClock} />
          <Badge color="primary" size="sm" icon={HiCheck} />
          <Badge color="secondary" size="sm" icon={HiClock} />
          <Badge color="error" size="sm" icon={HiCheck} />
          <Badge color="warning" size="sm" icon={HiClock} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge color="primary" icon={HiCheck} />
          <Badge color="secondary" icon={HiClock} />
          <Badge color="primary" size="sm" icon={HiCheck} />
          <Badge color="secondary" size="sm" icon={HiClock} />
          <Badge color="error" size="sm" icon={HiCheck} />
          <Badge color="warning" size="sm" icon={HiClock} />
        </div>
      </CardBox>
    </>
  );
};

export default IconBadge;
