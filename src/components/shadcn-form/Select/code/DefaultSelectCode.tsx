import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const DefaultSelectCode = () => {
  return (
    <>
      <CodeModal>
        {`  
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/Default-Ui/select";

<Select>
    <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
    </SelectContent>
</Select>
                `}
      </CodeModal>
    </>
  )
}

export default DefaultSelectCode