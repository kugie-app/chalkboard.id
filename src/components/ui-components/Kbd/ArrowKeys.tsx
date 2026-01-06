import React from "react";
import CardBox from "../../shared/CardBox";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { Kbd } from "flowbite-react";
const ArrowKeys = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Arrow Keys</h4>
        <div className="flex flex-wrap gap-3">
          <Kbd icon={MdKeyboardArrowUp} />
          <Kbd icon={MdKeyboardArrowDown} />
          <Kbd icon={MdKeyboardArrowLeft} />
          <Kbd icon={MdKeyboardArrowRight} />
        </div>
      </CardBox>
    </div>
  );
};

export default ArrowKeys;
