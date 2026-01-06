import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const InputWithLblCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import React from "react";
    import { Field, Input, Label } from "@headlessui/react";  
    
    <Field className="w-full mb-3">
        <Label className="mb-2 block text-ld">Name</Label>
        <Input
            type="text"
            className="ui-form-control rounded-md py-2.5 px-3 w-full"
            name="full_name"
        />
        </Field>
        <Field className="w-full mb-3">
        <Label className="mb-2 block text-ld">Email</Label>
        <Input
            type="email"
            className="ui-form-control rounded-md py-2.5 px-3 w-full"
            name="full_name"
        />
        </Field>
        <Field className="w-full ">
        <Label className="mb-2 block text-ld">Password</Label>
        <Input
            type="password"
            className="ui-form-control rounded-md py-2.5 px-3 w-full"
            name="full_name"
        />
    </Field>

        `}
      </CodeModal>
    </div>
  )
}

export default InputWithLblCode
