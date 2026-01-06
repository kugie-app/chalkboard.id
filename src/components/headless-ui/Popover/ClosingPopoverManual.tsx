"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import MyLink from "./MyLink";
import ClosingManuallyCode from "./Code/ClosingManuallyCode";

const ClosingPopoverManual = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Closing Popovers Manually</h4>
          <ClosingManuallyCode />
        </div>
        <div className="flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm w-full flex justify-center">
          <Popover>
            <PopoverButton className="block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white">
              Open Popover
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <CloseButton as={MyLink}>Insights</CloseButton>
            </PopoverPanel>
          </Popover>
        </div>
      </CardBox>
    </div>
  );
};

export default ClosingPopoverManual;
