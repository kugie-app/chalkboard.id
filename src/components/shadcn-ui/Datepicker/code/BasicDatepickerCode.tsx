import React from 'react'
import CodeModal from '../../CodeModal'

const BasicDatepickerCode = () => {
  return (
    <CodeModal>
        {
            `
import { Calendar } from "@/components/shadcn-ui/Default-Ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/shadcn-ui/Default-Ui/popover"

<Popover>
    <PopoverTrigger asChild>
        <Button
            variant={"outline"}
            className={cn(
                "w-full justify-start text-left font-normal group",
                !date && "text-muted-foreground"
            )}
        >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary group-hover:text-white" />
            {date ? format(date, "PPP") : <span className='text-primary group-hover:text-white' >Pick a date</span>}
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
        />
    </PopoverContent>
</Popover>
            `
        }
    </CodeModal>
  )
}

export default BasicDatepickerCode