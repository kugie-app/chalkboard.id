"use client";
import { Checkbox, Field, Label } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import CardBox from "../../shared/CardBox";

const RenderAsProps = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Render Props</h4>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <Field className="flex gap-3">
              <Checkbox checked={enabled} onChange={setEnabled} as={Fragment}>
                {({ checked, disabled }) => (
                  <span
                    className={clsx(
                      "group block h-[18px] w-[18px] rounded border border-bordergray dark:border-darkborder bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary",
                      !checked && "bg-white",
                      checked && !disabled && "bg-primary",
                      checked && disabled && "bg-gray-500",
                      disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <svg
                      className={clsx(
                        "stroke-white",
                        checked ? "opacity-100" : "opacity-0"
                      )}
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
                  </span>
                )}
              </Checkbox>
              <Label>
                Each component also exposes information about its current state
                via render props that you can use to conditionally apply
                different styles or render different content.
              </Label>
            </Field>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default RenderAsProps;
