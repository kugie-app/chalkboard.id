import React from 'react'
import CodeModal from '../../CodeModal'

const BasicCollapseCode = () => {
  return (
    <CodeModal>
        {
            `
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn-ui/Default-Ui/collapsible";
 
<Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 ">
          <h4 className="text-ld text-15 font-medium">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border border-ld px-4 py-3 text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border border-ld px-4 py-3 text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border border-ld px-4 py-3 text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
</Collapsible>
            `
        }
    </CodeModal>
  )
}

export default BasicCollapseCode