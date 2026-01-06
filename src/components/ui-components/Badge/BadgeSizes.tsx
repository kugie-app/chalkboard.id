import React from "react";
import SizesCode from "./Code/SizesCode";
import { Badge } from "flowbite-react";
import CardBox from "../../shared/CardBox";

const BadgeSizes = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Badge Sizes</h4>
          <SizesCode />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge color="primary" size="xs">
            Primary
          </Badge>
          <Badge color="secondary" size="xs">
            Secondary
          </Badge>
          <Badge color="success" size="xs">
            Success
          </Badge>
          <Badge color="info" size="xs">
            Info
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          <Badge color="primary" size="sm">
            Primary
          </Badge>
          <Badge color="secondary" size="sm">
            Secondary
          </Badge>
          <Badge color="success" size="sm">
            Success
          </Badge>
          <Badge color="info" size="sm">
            Info
          </Badge>
        </div>
      </CardBox>
    </>
  );
};

export default BadgeSizes;
