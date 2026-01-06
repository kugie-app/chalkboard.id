"use client";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { forwardRef } from "react";
import CardBox from "../../shared/CardBox";
import RenderPopoverCode from "./Code/RenderPopoverCode";

let MyCustomButton = forwardRef(function (props: any, ref: any) {
  return <button className="..." ref={ref} {...props} />;
});

const RenderAsElement = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
            Rendering Different Elements
          </h4>
          <RenderPopoverCode />
        </div>
        <div className="flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm w-full ">
          <Popover as="nav">
            <PopoverButton
              as={MyCustomButton}
              className="block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Render As Form View
            </PopoverButton>
            <PopoverPanel
              as="form"
              className="w-60 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="flex flex-col gap-1">
                <a href="/analytics" className="ui-dropdown-item">
                  Analytics
                </a>
                <a href="/engagement" className="ui-dropdown-item">
                  Engagement
                </a>
                <a href="/security" className="ui-dropdown-item">
                  Security
                </a>
                <a href="/integrations" className="ui-dropdown-item">
                  Integrations
                </a>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </CardBox>
    </div>
  );
};

export default RenderAsElement;
