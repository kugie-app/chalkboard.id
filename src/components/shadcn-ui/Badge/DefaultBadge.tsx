import React from 'react'
import CardBox from '../../shared/CardBox'
import DefaultBadgeCode from './code/DefaultBadgeCode'
import { Badge } from '@/components/shadcn-ui/Default-Ui/badge'

const DefaultBadge = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Default Badge</h4>
                 <DefaultBadgeCode/>
            </div>
            <div className="flex items-center gap-3 mt-4">
             <Badge>Primary</Badge>
             <Badge variant="secondary" >Secondary</Badge>
             <Badge variant="success" >Success</Badge>
             <Badge variant="warning" >Warning</Badge>
             <Badge variant="info" >Info</Badge>
             <Badge variant="error" >Error</Badge>
            </div>
        </CardBox>
    )
}

export default DefaultBadge