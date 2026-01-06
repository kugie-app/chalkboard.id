"use client";
import React, { useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import CoordinationCode from "./Codes/CoordinationCode";

const CoordinationTransition = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Coordinating Transition</h4>
          <CoordinationCode />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="ui-button bg-success justify-center"
        >
          Coordinating Transition
        </button>
        <Transition show={open}>
          {/* Backdrop */}
          <TransitionChild>
            <div
              className="fixed inset-0 bg-black/30 transition duration-300 data-[closed]:opacity-0"
              onClick={() => setOpen(false)}
            />
          </TransitionChild>

          {/* Slide-in sidebar */}
          <TransitionChild>
            <div className="fixed inset-y-0 z-[50] left-0 w-80 bg-white dark:bg-dark transition duration-300 data-[closed]:-translate-x-full p-4">
              <h3 className="text-lg mb-2">This Is Sidebar</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </TransitionChild>
        </Transition>
      </CardBox>
    </div>
  );
};

export default CoordinationTransition;
