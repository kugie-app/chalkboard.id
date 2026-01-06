
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Progress } from "@/components/shadcn-ui/Default-Ui/progress"

const BasicProgressbar = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Basic Progress</h4>
                {/* <BasicTooltipCode/> */}
            </div>
            <div className="flex flex-col items-center gap-4 mt-4">
            <Progress value={20} />
            <Progress value={40} />
            <Progress value={60} />
            <Progress value={80} />
            <Progress value={100} />


            </div>
        </CardBox>
    )
}

export default BasicProgressbar