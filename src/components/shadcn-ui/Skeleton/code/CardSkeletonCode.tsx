import React from 'react'
import CodeModal from '../../CodeModal'

const CardSkeletonCode = () => {
  return (
    <CodeModal>
        {
            `
import { Skeleton } from "@/components/shadcn-ui/Default-Ui/skeleton"

<div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
    </div>
</div>        
            `
        }
    </CodeModal>
  )
}

export default CardSkeletonCode