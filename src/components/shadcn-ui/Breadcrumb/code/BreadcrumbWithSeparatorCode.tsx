import React from 'react'
import CodeModal from '../../CodeModal'

const BreadcrumbWithSeparatorCode = () => {
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
import { Slash } from "lucide-react"

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
        `
    }
    </CodeModal>
  )
}

export default BreadcrumbWithSeparatorCode