import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const IntialTransitionCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import React, { useState } from "react";
    import { Transition, Button } from "@headlessui/react"; 
    
    const [open, setOpen] = useState(true);

    <div className="flex flex-col items-center">
        <Transition show={open} appear={true}>
        <div className="transition duration-300 ease-in data-[closed]:opacity-0 bg-lightgray dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72">
            I will fade in on initial render
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
        </Transition>
        <Button
        onClick={() => setOpen((open) => !open)}
        className="transition data-[hover]:scale-105 ui-button justify-center bg-info gap-3 mt-5  "
        >
        On Intial Transition
        </Button>
    </div>
        `}
      </CodeModal>
    </div>
  )
}

export default IntialTransitionCode
