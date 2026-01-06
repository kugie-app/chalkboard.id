import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const ScrollableDialogCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
    import React, { useState } from "react";

    const BasicDialog = () => {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <div>
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
        </div>
    );
    };
        `}
      </CodeModal>
    </div>
  );
};

export default ScrollableDialogCode;
