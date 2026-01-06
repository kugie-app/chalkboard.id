"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Checkbox, Field, Label } from "@headlessui/react";
import { useState } from "react";
import UsingHtmlFormCode from "./Codes/UsingHtmlFormCode";
const UsingHtmlForm = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">With HTML Forms</h4>
          <UsingHtmlFormCode/>
        </div>
        <form action="/accounts" method="post">
          <Field className="flex items-center gap-3">
            <Checkbox
              checked={enabled}
              onChange={setEnabled}
              name="terms-of-service"
              className="group block ui-checkbox"
            >
              <svg
                className="stroke-white opacity-0 group-data-[checked]:opacity-100"
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
            <Label className="cursor-pointer">Agree to terms and conditions</Label>
          </Field>
          <div className="flex gap-3 mt-4">
          <button className="ui-button bg-primary justify-center">Submit</button>
          <button className="ui-button bg-error justify-center">Cancel</button>
          </div>
        </form>
      </CardBox>
    </div>
  );
};

export default UsingHtmlForm;
