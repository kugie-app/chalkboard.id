
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Button } from '@/components/shadcn-ui/Default-Ui/button'
import BasicButtonCode from './code/BasicButtonCode'


const BasicButton = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Basic Button</h4>
                 <BasicButtonCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
               <Button>Primary</Button>
               <Button variant="secondary">Secondary</Button>
               <Button variant="success">Success</Button>
               <Button variant="warning">Warning</Button>
               <Button variant="error">Error</Button>
               <Button variant="info">Info</Button>
            </div>
        </CardBox>
    )
}

export default BasicButton