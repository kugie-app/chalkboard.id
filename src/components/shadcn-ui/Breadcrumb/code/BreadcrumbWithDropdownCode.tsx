import React from 'react'
import CodeModal from '../../CodeModal'

const BreadcrumbWithDropdownCode = () => {
  return (
    <CodeModal>
  {
    `
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn-ui/Default-Ui/breadcrumb"
import { ChevronDownIcon, Slash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/shadcn-ui/Default-Ui/dropdown-menu'

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
    `
  }
    </CodeModal>
  )
}

export default BreadcrumbWithDropdownCode