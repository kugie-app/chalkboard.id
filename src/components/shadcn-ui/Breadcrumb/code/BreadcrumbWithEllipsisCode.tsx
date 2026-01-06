import React from 'react'
import CodeModal from '../../CodeModal'

const BreadcrumbWithEllipsisCode = () => {
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
import { BreadcrumbEllipsis } from "@/components/shadcn-ui/Default-Ui/breadcrumb"

<Breadcrumb>
    <BreadcrumbList>
        <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
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

export default BreadcrumbWithEllipsisCode