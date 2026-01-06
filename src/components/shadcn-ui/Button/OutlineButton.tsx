
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Button } from '@/components/shadcn-ui/Default-Ui/button'
import OutlineButtonCode from './code/OutlineButtonCode'



const OutlineButton = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Outline Button</h4>
                 <OutlineButtonCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
               <Button variant="outline">Primary</Button>
               <Button variant="outlinesecondary">Secondary</Button>
               <Button variant="outlinesuccess">Success</Button>
               <Button variant="outlinewarning">Warning</Button>
               <Button variant="outlineerror">Error</Button>
               <Button variant="outlineinfo">Info</Button>
            </div>
        </CardBox>
    )
}

export default OutlineButton