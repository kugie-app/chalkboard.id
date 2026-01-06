import CardBox from "@/components/shared/CardBox";
import { Badge, Label, Select } from "flowbite-react";
import React from "react";

const Producttemplate = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">Product Template</h5>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="temp" value="Select a product template" />
            <span className="text-error ms-1">*</span>
          </div>
          <Select id="temp" className="select-md" required>
            <option selected>Fashion</option>
            <option>Default Template</option>
            <option>Office Stationary</option>
            <option>Electronics</option>
          </Select>
          <small className="text-xs text-darklink dark:text-bodytext">
            Assign a template from your current theme to define how a single
            product is displayed.
          </small>
        </div>
      </CardBox>
    </>
  );
};

export default Producttemplate;
