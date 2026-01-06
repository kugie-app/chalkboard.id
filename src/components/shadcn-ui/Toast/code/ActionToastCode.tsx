import React from 'react'
import CodeModal from '../../CodeModal'

const ActionToastCode = () => {
  return (
    <CodeModal>
        {
            `
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import { ToastAction } from "@/components/shadcn-ui/Default-Ui/toast";
 
<Button
    variant="outline"
    onClick={() => {
    toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
    }}
    >
    Show Toast
</Button>
            `
        }
    </CodeModal>
  )
}

export default ActionToastCode