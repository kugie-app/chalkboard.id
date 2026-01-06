"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Checkbox } from "@/components/shadcn-ui/Default-Ui/checkbox";
import DefaultCheckCode from "./code/DefaultCheckCode";

const DefaultChecked = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">Default Checked</h4>
        <DefaultCheckCode/>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms11" checked />
          <label htmlFor="terms11" className="text-ld">
            Accept terms and conditions
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="privacy22" checked />
          <label htmlFor="privacy22" className="text-ld">
            Accept privacy policy
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="continue33" checked />
          <label htmlFor="continue33" className="text-ld">
             Continue to process?
          </label>
        </div>
      </div>
    </CardBox>
  );
};

export default DefaultChecked;
