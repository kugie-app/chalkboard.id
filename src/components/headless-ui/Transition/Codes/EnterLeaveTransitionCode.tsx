import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const EnterLeaveTransitionCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import React, { useState } from "react";
    import { Transition } from "@headlessui/react";
    import clsx from "clsx";

    <div className="relative">
        <button onClick={() => setOpen((open) => !open)} className="ui-button bg-secondary justify-center w-full">Transition</button>
        <Transition show={open}>
        <div
            className={clsx([
            // Base styles
            "absolute transition ease-in-out bg-white dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72 mt-1",
            // Shared closed styles
            "data-[closed]:opacity-0 ",
            // Entering styles
            "data-[enter]:duration-100 data-[enter]:data-[closed]:-translate-x-full",
            // Leaving styles
            "data-[leave]:duration-300 data-[leave]:data-[closed]:translate-x-full",
            ])}
        >
            I will enter from the left and leave to the right
        </div>
        </Transition>
    </div>
        `}
      </CodeModal>
    </div>
  )
}

export default EnterLeaveTransitionCode
