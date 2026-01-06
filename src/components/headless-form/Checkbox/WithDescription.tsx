"use client";
import React from "react";
import { Checkbox, Description, Field, Label } from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import WithDescriptionCode from "./Codes/WithDescriptionCode";

const WithDescription = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between ">
          <h4 className="text-lg font-semibold">With Discription</h4>
          <WithDescriptionCode/>
        </div>
        <div>
          <Field className="flex gap-3">
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
            <div>
              <Label>Enable beta features</Label>
              <Description>
                This will give you early access to new features we're
                developing.
              </Description>
            </div>
          </Field>
        </div>
      </CardBox>
    </div>
  );
};

export default WithDescription;
