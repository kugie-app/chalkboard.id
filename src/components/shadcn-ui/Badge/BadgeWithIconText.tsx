"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import DefaultBadgeCode from './code/DefaultBadgeCode'
import { Badge } from '@/components/shadcn-ui/Default-Ui/badge'
import { Icon } from '@iconify/react/dist/iconify.js'
import BadgeWithIconCode from './code/BadgeWithIconCode'

const BadgeWithIconText = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Badge With Icon Text</h4>
                 <BadgeWithIconCode/>
            </div>
            <div className="flex items-center flex-wrap gap-3 mt-4">
             <Badge><div className="flex items-center gap-1"><Icon icon="tabler:check" className='text-base' />2 minutes ago</div></Badge>
             <Badge variant="secondary" ><div className="flex items-center gap-1"><Icon icon="tabler:time-duration-30" className='text-base' />3 days ago</div></Badge>
             <Badge variant="success" ><div className="flex items-center gap-1"><Icon icon="tabler:time-duration-60" className='text-base' />4 minutes dago</div></Badge>
             <Badge variant="error" ><div className="flex items-center gap-1"><Icon icon="tabler:calendar-time" className='text-base' />6 days ago</div></Badge>
             <Badge variant="info" ><div className="flex items-center gap-1"><Icon icon="tabler:file-time" className='text-base' />10 days ago</div></Badge>
            </div>
        </CardBox>
    )
}

export default BadgeWithIconText