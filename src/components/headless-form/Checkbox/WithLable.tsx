"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Checkbox, Field, Label } from "@headlessui/react";
import WithLabelCode from "./Codes/WithLabelCode";

const WithLable = () => {
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Checkbox Label</h4>
          <WithLabelCode/>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100 rounded"
                  viewBox="0 0 14 14"
                  fill="none"
                  height={15}
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="cursor-pointer">Checkbox With Label</Label>
            </Field>
          </div>
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
                checked={enabled1}
                onChange={setEnabled1}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100 rounded"
                  viewBox="0 0 14 14"
                  fill="none"
                  height={15}
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="cursor-pointer">Checkbox With Label</Label>
            </Field>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default WithLable;
