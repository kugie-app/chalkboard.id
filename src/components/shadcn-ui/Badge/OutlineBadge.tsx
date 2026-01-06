import React from 'react'
import CardBox from '../../shared/CardBox'
import OutlineBadgeCode from './code/OutlineBadgeCode'
import { Badge } from '@/components/shadcn-ui/Default-Ui/badge'

const OutlineBadge = () => {
  return (
    <CardBox>
    <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Outline Badge</h4>
         <OutlineBadgeCode/>
    </div>
    <div className="flex items-center gap-3 mt-4">
     <Badge variant="outline">Primary</Badge>
     <Badge variant="outlineSecondary" >Secondary</Badge>
     <Badge variant="outlineSuccess" >Success</Badge>
     <Badge variant="outlineWarning" >Warning</Badge>
     <Badge variant="outlineInfo" >Info</Badge>
     <Badge variant="outlineError" >Error</Badge>
    </div>
</CardBox>
  )
}

export default OutlineBadge