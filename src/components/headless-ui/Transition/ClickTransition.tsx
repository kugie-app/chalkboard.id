"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Button, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import ClickTransitionCode from "./Codes/ClickTransitionCode";

const ClickTransition = () => {
  let [isShowing, setIsShowing] = useState(true);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Click To Transition</h4>
          <ClickTransitionCode/>
        </div>
        <div className="flex flex-col items-center">
          <div className="size-[6.25rem]">
            <Transition show={isShowing}>
              <div
                className={clsx(
                  "size-full rounded-xl bg-primary shadow-lg transition duration-400",
                  "data-[closed]:scale-50 data-[closed]:rotate-[-120deg] data-[closed]:opacity-0",
                  "data-[leave]:duration-200 data-[leave]:ease-in-out",
                  "data-[leave]:data-[closed]:scale-95 data-[leave]:data-[closed]:rotate-[0deg]"
                )}
              />
            </Transition>
          </div>

          <Button
            onClick={() => {
              setIsShowing(false);
              setTimeout(() => setIsShowing(true), 500);
            }}
            className=" transition data-[hover]:scale-105 ui-button justify-center bg-secondary gap-3 mt-4"
          >
            <Icon icon="solar:refresh-bold" height={20} />
            <span>Click to transition</span>
          </Button>
        </div>
      </CardBox>
    </div>
  );
};
export default ClickTransition;
