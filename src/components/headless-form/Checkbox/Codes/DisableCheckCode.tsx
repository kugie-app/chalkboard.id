import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const DisableCheckCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import React, { useState } from "react";
    import { Checkbox, Field, Label } from "@headlessui/react"; 
    
    <div className="flex flex-col gap-3">
          <div>
            <Field disabled className="flex items-center gap-3">
              
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="data-[disabled]:opacity-50">
                Enable beta features
              </Label>
            </Field>
          </div>
          <div>
            <Field disabled className="flex items-center gap-3">
              
              <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
              >
                <svg
                  className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Checkbox>
              <Label className="data-[disabled]:opacity-50">
                Enable beta features
              </Label>
            </Field>
          </div>
        </div>
        `}
      </CodeModal>
    </div>
  )
}

export default DisableCheckCode
 