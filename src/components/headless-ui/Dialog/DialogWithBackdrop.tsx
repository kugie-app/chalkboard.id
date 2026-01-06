"use client";
import { useState } from "react";
import React from "react";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import CardBox from "../../shared/CardBox";
import WithBackdropCode from "./Code/WithBackdropCode";
const DialogWithBackdrop = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Dialog With Backdrop</h4>
          <WithBackdropCode/>
        </div>
        <button onClick={() => setIsOpen(true)} className="ui-button bg-secondary justify-center">Open Dialog</button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel
              transition
              className="w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle className="text-lg font-semibold text-ld">
                Deactivate account
              </DialogTitle>
              <Description className="mt-2 text-sm text-bodytext">
                This will permanently deactivate your account
              </Description>
              <p className="mt-2 text-sm text-bodytext">
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed.
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="ui-button-small bg-error"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ui-button-small bg-warning"
                >
                  Deactivate
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </CardBox>
    </div>
  );
};

export default DialogWithBackdrop;
