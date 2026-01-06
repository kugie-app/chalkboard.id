import React from "react";
import CardBox from "../../shared/CardBox";
import LinkBadgeCode from "./Code/LinkBadgeCode";
import { Badge } from "flowbite-react";

const LinkBadges = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Badges as link</h4>
          <LinkBadgeCode />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex flex-wrap gap-2">
            <Badge href="#" color="primary">
              Badge Link 1
            </Badge>
            <Badge href="#" color="secondary">
             Badge Link 2
            </Badge>
            <Badge href="#" color="error">
             Badge Link 3
            </Badge>
            <Badge href="#" color="warning">
             Badge Link 4
            </Badge>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default LinkBadges;
