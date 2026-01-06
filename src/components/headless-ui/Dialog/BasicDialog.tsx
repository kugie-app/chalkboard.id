"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import BasicDialodCode from "./Code/BasicDialodCode";

const BasicDialog = () => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Basic Dialog</h4>
          <BasicDialodCode />
        </div>
        <button onClick={open} className="ui-button bg-primary justify-center">
          Open Dialog
        </button>

        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle as="h3" className="text-lg font-semibold text-ld">
                  Payment successful
                </DialogTitle>
                <p className="mt-2 text-sm text-bodytext">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    className="ui-button-small px-6 bg-info"
                    onClick={close}
                  >
                    Got it, thanks!
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ui-button-small bg-error px-6"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </CardBox>
    </div>
  );
};

export default BasicDialog;
