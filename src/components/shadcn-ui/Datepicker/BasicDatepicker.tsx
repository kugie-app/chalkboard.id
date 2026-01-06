
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/shadcn-ui/Default-Ui/button"
import { Calendar } from "@/components/shadcn-ui/Default-Ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/shadcn-ui/Default-Ui/popover"
import BasicDatepickerCode from './code/BasicDatepickerCode'




const BasicDatepicker = () => {
    const [date, setDate] = React.useState<Date>()
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Basic Datepicker</h4>
                <BasicDatepickerCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
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
            </div>
        </CardBox>
    )
}

export default BasicDatepicker