
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn-ui/Default-Ui/breadcrumb"
import { Slash } from "lucide-react"
import BasicBreadcrumbCode from './code/BasicBreadcrumbCode'
import BreadcrumbWithSeparatorCode from './code/BreadcrumbWithSeparatorCode'



const BreadcrumbWithSeparator = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Breadcrumb With Custom Separator</h4>
                <BreadcrumbWithSeparatorCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </CardBox>
    )
}

export default BreadcrumbWithSeparator