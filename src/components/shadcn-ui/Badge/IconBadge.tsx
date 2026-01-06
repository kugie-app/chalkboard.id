
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import DefaultBadgeCode from './code/DefaultBadgeCode'
import { Badge } from '@/components/shadcn-ui/Default-Ui/badge'
import { Icon } from '@iconify/react/dist/iconify.js'
import IconBadgeCode from './code/IconBadgeCode'

const Iconbadge = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Icon Badge</h4>
                 <IconBadgeCode/>
            </div>
            <div className="flex items-center gap-3 mt-4">
             <Badge><Icon icon="tabler:check" className='text-base' /></Badge>
             <Badge variant="secondary" ><Icon icon="tabler:time-duration-30" className='text-base' /></Badge>
             <Badge variant="success" ><Icon icon="tabler:time-duration-60" className='text-base' /></Badge>
             <Badge variant="error" ><Icon icon="tabler:calendar-time" className='text-base' /></Badge>
             <Badge variant="info" ><Icon icon="tabler:file-time" className='text-base' /></Badge>
            </div>
        </CardBox>
    )
}

export default Iconbadge