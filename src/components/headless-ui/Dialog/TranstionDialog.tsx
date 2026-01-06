"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import TransitionDialogCode from "./Code/TransitionDialogCode";

const TranstionDialog = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Transitions Dialog</h4>
          <TransitionDialogCode />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="ui-button bg-error justify-center"
        >
          Open Dialog
        </button>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          transition
          className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0 z-50"
        >
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md "
              >
                <DialogTitle as="h3" className="text-lg font-semibold text-ld">
                  Transition Dialog
                </DialogTitle>
                <p className="mt-2 text-sm text-bodytext">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    className="ui-button-small px-6 bg-info"
                    onClick={() => setIsOpen(false)}
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

export default TranstionDialog;
