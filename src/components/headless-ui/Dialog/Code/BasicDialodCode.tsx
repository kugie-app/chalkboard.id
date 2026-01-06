import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const BasicDialodCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
    import React, { useState } from "react";

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
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-ld"
                >
                  Payment successful
                </DialogTitle>
                <p className="mt-2 text-sm text-bodytext">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="ui-button px-6 bg-info" onClick={close}>
                    Got it, thanks!
                  </button>
                  <button onClick={() => setIsOpen(false)} className="ui-button bg-error px-6" >Cancel</button>
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

export default BasicDialodCode;
