"use client";
import React from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import FramerMotionDialogCode from "./Code/FramerMotionDialogCode";

const FramerAnimationDialog = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Framer Motion Dialog</h4>
          <FramerMotionDialogCode />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="ui-button bg-warning justify-center"
        >
          Open dialog
        </button>
        <AnimatePresence>
          {isOpen && (
            <Dialog
              static
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30"
              />
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-md rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md"
                >
                  <DialogTitle className="text-lg font-semibold text-ld">
                    Framer Motion Dialog
                  </DialogTitle>
                  <Description className="mt-2 text-sm text-bodytext">
                    This will permanently deactivate your account
                  </Description>
                  <p className="mt-2 text-sm text-bodytext">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed.
                  </p>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="ui-button-small px-6 bg-error"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="ui-button-small px-6 bg-warning"
                    >
                      Deactivate
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </CardBox>
    </div>
  );
};

export default FramerAnimationDialog;
