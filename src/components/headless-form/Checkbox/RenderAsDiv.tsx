"use client";
import { Checkbox, Field, Label } from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";

const RenderAsDiv = () => {
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Render As a Div Elements</h4>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
              as="div"
                checked={enabled}
                onChange={setEnabled}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
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
              <Label className="cursor-pointer">Checkbox With Transitoin</Label>
            </Field>
          </div>
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
              as="div"
                checked={enabled1}
                onChange={setEnabled1}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
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
              <Label className="cursor-pointer">Checkbox With Transitoin</Label>
            </Field>
          </div>
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
              as="div"
                checked={enabled2}
                onChange={setEnabled2}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
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
              <Label className="cursor-pointer">Checkbox With Transitoin</Label>
            </Field>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default RenderAsDiv;
