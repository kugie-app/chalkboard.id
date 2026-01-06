
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Skeleton } from "@/components/shadcn-ui/Default-Ui/skeleton"
import BasicSkeletonCode from './code/BasicSkeletonCode'




const BasicSkeleton = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Basic Skeleton</h4>
                <BasicSkeletonCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        </CardBox>
    )
}

export default BasicSkeleton