import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const DafaultTextareacode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { Textarea } from "@/components/shadcn-ui/Default-Ui/textarea";

 <Textarea placeholder="Type your message here." />
                `}
      </CodeModal>
    </>
  )
}

export default DafaultTextareacode