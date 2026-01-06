"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Checkbox } from "@/components/shadcn-ui/Default-Ui/checkbox";
import DisabledCheckCode from "./code/DisabledCheckCode";

const DisabledCehckboxes = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">Disables</h4>
        <DisabledCheckCode />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms1" disabled />
          <label htmlFor="terms1" className="text-ld">
            Accept terms and conditions
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="privacy2" disabled />
          <label htmlFor="privacy2" className="text-ld">
            Accept privacy policy
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="continue3" disabled />
          <label htmlFor="continue3" className="text-ld">
            Continue to process?
          </label>
        </div>
      </div>
    </CardBox>
  );
};

export default DisabledCehckboxes;
