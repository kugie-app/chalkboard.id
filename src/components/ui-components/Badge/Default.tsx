"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Badge } from "flowbite-react";
import DefautBadgeCode from "./Code/DefautBadgeCode";

const Default = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Default Badges</h4>
          <DefautBadgeCode />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Danger</Badge>
        </div>
      </CardBox>
    </>
  );
};

export default Default;
