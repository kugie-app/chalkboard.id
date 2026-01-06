"use client";
import React from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import ScrollableDialogCode from "./Code/ScrollableDialogCode";


const ScrollableDialog = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Scrollable Dialog</h4>
           <ScrollableDialogCode/>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="ui-button bg-success justify-center"
        >
          Open Dialog
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="z-50 realtive"
        >
          <div className="fixed inset-0 w-screen overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="max-w-lg space-y-4 rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                <DialogTitle className="text-lg font-semibold text-ld ">
                  Deactivate account
                </DialogTitle>
                <Description className="mt-3 text-sm text-bodytext">
                  This will permanently deactivate your account
                </Description>
                <p className="mt-2 text-sm text-bodytext">
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed.
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    className="ui-button-small px-6 bg-info"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ui-button-small bg-error px-6"
                  >
                    Deactivate
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

export default ScrollableDialog;
