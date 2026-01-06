import React from "react";
import CardBox from "../../shared/CardBox";
import { Breadcrumb } from "flowbite-react";
import BDefaultCode from "./Code/BDefaultCode";
import { HiHome } from "react-icons/hi";
const Default = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default Breadcrumb</h4>
          <BDefaultCode />
        </div>
        <Breadcrumb aria-label="Default breadcrumb example" className="!justify-start !w-auto">
          <Breadcrumb.Item href="#" icon={HiHome}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
          <Breadcrumb.Item>matdash IM</Breadcrumb.Item>
        </Breadcrumb>
      </CardBox>
    </div>
  );
};

export default Default;
