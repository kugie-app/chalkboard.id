"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import FramerPopoverCode from "./Code/FramerPopoverCode";

const FramerMotionPopover = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Framer Motion Popover</h4>
          <FramerPopoverCode />
        </div>
        <div className="flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm w-full flex justify-center">
          <Popover>
            {({ open }) => (
              <>
                <PopoverButton className="block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white">
                  Framer Motion
                </PopoverButton>
                <AnimatePresence>
                  {open && (
                    <PopoverPanel
                      static
                      as={motion.div}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      anchor="bottom"
                      className="flex origin-top flex-col w-52 z-[60] py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md"
                    >
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
                    </PopoverPanel>
                  )}
                </AnimatePresence>
              </>
            )}
          </Popover>
        </div>
      </CardBox>
    </div>
  );
};

export default FramerMotionPopover;
