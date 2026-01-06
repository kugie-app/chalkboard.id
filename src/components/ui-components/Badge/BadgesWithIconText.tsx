import React from "react";
import CardBox from "../../shared/CardBox";
import BadgeWithIconCode from "./Code/BadgeWithIconCode";
import { Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";
const BadgesWithIconText = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Badge with icon text</h4>
          <BadgeWithIconCode />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge icon={HiCheck} color="primary">
            2 minutes ago
          </Badge>
          <Badge color="success" icon={HiClock}>
            3 days ago
          </Badge>
          <Badge color="error" icon={HiCheck}>
            4 days ago
          </Badge>
          <Badge color="info" icon={HiClock}>
            5 days ago
          </Badge>
        </div>
      </CardBox>
    </>
  );
};

export default BadgesWithIconText;
