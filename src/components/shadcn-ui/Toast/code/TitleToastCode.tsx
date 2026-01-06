import React from 'react'
import CodeModal from '../../CodeModal'

const TitleToastCode = () => {
  return (
    <CodeModal>
        {
            `
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
 
<Button
  variant="outline"
  onClick={() => {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
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

export default TitleToastCode