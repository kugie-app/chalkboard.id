
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Skeleton } from "@/components/shadcn-ui/Default-Ui/skeleton"
import BasicSkeletonCode from './code/BasicSkeletonCode'
import CardSkeletonCode from './code/CardSkeletonCode'




const CardSkeleton = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Card Skeleton</h4>
                <CardSkeletonCode />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        </CardBox>
    )
}

export default CardSkeleton