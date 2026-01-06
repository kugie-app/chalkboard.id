import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const DisabledCheckCode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { Checkbox } from "@/components/shadcn-ui/Default-Ui/checkbox";

<div className="flex flex-col gap-3">
    <div className="flex items-center space-x-2">
        <Checkbox id="terms1" disabled />
        <label htmlFor="terms1" className="text-ld">
        Accept terms and conditions
        </label>
    </div>

    <div className="flex items-center space-x-2">
        <Checkbox id="privacy2" disabled />
        <label htmlFor="privacy2" className="text-ld">
        Accept privacy policy
        </label>
    </div>
    <div className="flex items-center space-x-2">
        <Checkbox id="continue3" disabled />
        <label htmlFor="continue3" className="text-ld">
            Continue to process?
        </label>
    </div>
</div>
                `}
      </CodeModal>
    </>
  )
}

export default DisabledCheckCode