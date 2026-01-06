import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const ClickTransitionCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import React, { useState } from "react";
    import { Button, Transition } from "@headlessui/react";
    import { Icon } from "@iconify/react";
    import clsx from "clsx";

    let [isShowing, setIsShowing] = useState(true);

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
            className=" transition data-[hover]:scale-105 ui-button justify-cente bg-error gap-3 mt-4"
          >
            <Icon icon="solar:refresh-bold" height={20} />
            <span>Click to transition</span>
          </Button>
    </div>
        `}
      </CodeModal>
    </div>
  );
};

export default ClickTransitionCode;
