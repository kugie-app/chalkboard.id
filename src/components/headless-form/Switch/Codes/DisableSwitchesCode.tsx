import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const DisableSwitchesCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Switch, Field } from "@headlessui/react";
    import { useState } from "react";
    
    const [enabled, setEnabled] = useState(true);
    
    <Field className="flex flex-wrap gap-3" disabled>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:bg-primary"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:bg-secondary"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:bg-success"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:bg-error"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:bg-warning"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:bg-info"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </Field>
        `}
      </CodeModal>
    </div>
  )
}

export default DisableSwitchesCode
