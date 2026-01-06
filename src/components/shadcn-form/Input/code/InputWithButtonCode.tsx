import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const InputWithButtonCode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { Input } from "@/components/shadcn-ui/Default-Ui/input";
import { Label } from "@/components/shadcn-ui/Default-Ui/label";
import { Button } from "../../shadcn-ui/Default-Ui/button";

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
    <div className="flex gap-3">
      <Button>Submit</Button>
      <Button variant={"error"}>Cancel</Button>
    </div>
</div>
                `}
      </CodeModal>
    </>
  )
}

export default InputWithButtonCode