import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const ClosingManuallyCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import React from "react";
    import {
    CloseButton,
    Popover,
    PopoverButton,
    PopoverPanel,
    } from "@headlessui/react";
    import MyLink from "./MyLink";

    <div className="flex gap-8 bg-lightgray dark:bg-dark py-2 px-4 rounded-sm w-full flex justify-center">
        <Popover>
        <PopoverButton className="block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white">
            Open Popover
        </PopoverButton>
        <PopoverPanel
            anchor="bottom"
            className="w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
            <CloseButton as={MyLink}>Insights</CloseButton>
        </PopoverPanel>
        </Popover>
    </div>

        `}
      </CodeModal>
    </div>
  )
}

export default ClosingManuallyCode
