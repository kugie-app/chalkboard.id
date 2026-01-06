import React from 'react'
import CodeModal from '../../CodeModal'


const BasicAccordiancode = () => {
  return (
    <>
      <CodeModal>
        {`  
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcn-ui/Default-Ui/accordion"

<Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
        <AccordionTrigger className='text-base font-semibold' >Is it accessible?</AccordionTrigger>
        <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger className='text-base font-semibold'>Is it styled?</AccordionTrigger>
        <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
        <AccordionTrigger className='text-base font-semibold'>Is it animated?</AccordionTrigger>
        <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
        </AccordionContent>
    </AccordionItem>
</Accordion>
                `}
      </CodeModal>
    </>
  )
}

export default BasicAccordiancode