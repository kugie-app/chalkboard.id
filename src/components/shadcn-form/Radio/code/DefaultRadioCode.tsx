import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const DefaultRadioCode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { Label } from "@/components/shadcn-ui/Default-Ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn-ui/Default-Ui/radio-group";

<RadioGroup defaultValue="comfortable">
    <div className="flex items-top space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1" className="font-normal">Default</Label>
    </div>
    <div className="flex items-top space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2" className="font-normal"> Comfortable</Label>
    </div>
    <div className="flex items-top space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3" className="font-normal">Compact</Label>
    </div>
    <div className="flex items-top space-x-2">
        <RadioGroupItem value="digital" id="r4" />
        <Label htmlFor="r4" className="font-normal">Digital</Label>
    </div>
    <div className="flex items-top space-x-2">
        <RadioGroupItem value="Enlarge" id="r5" />
        <Label htmlFor="r5" className="font-normal">Enlarge</Label>
    </div>
    <div className="flex items-top space-x-2">
        <RadioGroupItem value="Maximize" id="r6" />
        <Label htmlFor="r6" className="font-normal">Maximize</Label>
    </div>
</RadioGroup>
                `}
      </CodeModal>
    </>
  )
}

export default DefaultRadioCode