
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Button } from '@/components/shadcn-ui/Default-Ui/button'
import GhostButtonCode from './code/GhostButtonCode'



const GhostButton = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Ghost Button</h4>
                  <GhostButtonCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
               <Button variant="ghostprimary" >Primary</Button>
               <Button variant="ghostsecondary" >Secondary</Button>
               <Button variant="ghostsuccess" >Success</Button>
               <Button variant="ghostwarning" >Warning</Button>
               <Button variant="ghosterror" >Error</Button>
               <Button variant="ghostinfo" >Info</Button>
            </div>
        </CardBox>
    )
}

export default GhostButton