import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const InputLabelCode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { Input } from "@/components/shadcn-ui/Default-Ui/input";
import { Label } from "@/components/shadcn-ui/Default-Ui/label";

<div className="flex flex-col gap-5 mt-4">
    <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" />
    </div>
    <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" />
    </div>
    <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" />
    </div>
</div>
                `}
      </CodeModal>
    </>
  )
}

export default InputLabelCode