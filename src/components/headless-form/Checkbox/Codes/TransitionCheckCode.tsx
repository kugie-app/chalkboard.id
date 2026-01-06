import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const TransitionCheckCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Checkbox, Field, Label } from "@headlessui/react";
    import { useState } from "react";
    
    const [enabled, setEnabled] = useState(false);
    const [enabled1, setEnabled1] = useState(false);
    const [enabled2, setEnabled2] = useState(false);

     <div className="flex flex-col gap-3">
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                  height={15}
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="cursor-pointer">Checkbox With Transitoin</Label>
            </Field>
          </div>
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
                checked={enabled1}
                onChange={setEnabled1}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                  height={15}
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="cursor-pointer">Checkbox With Transitoin</Label>
            </Field>
          </div>
          <div>
            <Field className="flex items-center gap-3">
              <Checkbox
                checked={enabled2}
                onChange={setEnabled2}
                className="group block ui-checkbox"
              >
                <svg
                  className="stroke-white opacity-0 transition group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                  height={15}
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="cursor-pointer">Checkbox With Transitoin</Label>
            </Field>
          </div>
        </div>
        

        `}
      </CodeModal>
    </div>
  )
}

export default TransitionCheckCode
