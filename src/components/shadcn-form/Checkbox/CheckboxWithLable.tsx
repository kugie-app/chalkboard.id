"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Checkbox } from "@/components/shadcn-ui/Default-Ui/checkbox";
import CheckboxLabelCode from "./code/CheckboxLabelCode";

const CheckboxWithLable = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">With Label</h4>
        <CheckboxLabelCode/>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-ld">
            Accept terms and conditions
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="privacy" />
          <label htmlFor="privacy" className="text-ld">
            Accept privacy policy
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="continue" />
          <label htmlFor="continue" className="text-ld">
             Continue to process?
          </label>
        </div>
      </div>
    </CardBox>
  );
};

export default CheckboxWithLable;
