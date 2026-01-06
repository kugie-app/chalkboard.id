
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
import { ChevronDownIcon, Slash } from "lucide-react"
import BasicBreadcrumbCode from './code/BasicBreadcrumbCode'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn-ui/Default-Ui/dropdown-menu'
import BreadcrumbWithDropdownCode from './code/BreadcrumbWithDropdownCode'



const BreadcrumbWithDropdown = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Breadcrumb With Dropdown</h4>
                <BreadcrumbWithDropdownCode />
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
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                Components
                                <ChevronDownIcon size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" >
                                <DropdownMenuItem >Documentation</DropdownMenuItem>
                                <DropdownMenuItem >Themes</DropdownMenuItem>
                                <DropdownMenuItem >GitHub</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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

export default BreadcrumbWithDropdown