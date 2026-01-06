import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const CheckboxLabelCode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { Checkbox } from "@/components/shadcn-ui/Default-Ui/checkbox";

<div className="flex flex-col gap-3">
    <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-ld">
        Accept terms and conditions
        </label>
    </div>

    <div className="flex items-center space-x-2">
        <Checkbox id="privacy" />
        <label htmlFor="privacy" className="text-ld">
        Accept privacy policy
        </label>
    </div>
    <div className="flex items-center space-x-2">
        <Checkbox id="continue" />
        <label htmlFor="continue" className="text-ld">
            Continue to process?
        </label>
    </div>
</div>
                `}
      </CodeModal>
    </>
  )
}

export default CheckboxLabelCode