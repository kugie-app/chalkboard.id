
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Button } from '@/components/shadcn-ui/Default-Ui/button'
import { Loader2 } from 'lucide-react'
import LoadingButtonCode from './code/LoadingButtonCode'



const LoadingButton = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Loading Button</h4>
               <LoadingButtonCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
               <Button disabled ><Loader2 className="animate-spin" /> Please wait</Button>
               <Button variant="secondary" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
               <Button variant="success" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
               <Button variant="warning" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
               <Button variant="error" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
               <Button variant="info" disabled ><Loader2 className="animate-spin" /> Please wait</Button>
            </div>
        </CardBox>
    )
}

export default LoadingButton