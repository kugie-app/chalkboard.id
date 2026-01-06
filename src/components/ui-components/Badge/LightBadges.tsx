import React from 'react'
import CardBox from '../../shared/CardBox'
import DefautBadgeCode from './Code/DefautBadgeCode'
import { Badge } from 'flowbite-react'

const LightBadges = () => {
  return (
    <>
        <CardBox>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Light Badges</h4>
              <DefautBadgeCode/> 
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge color="lightprimary">Primary</Badge>
              <Badge color="lightsecondary">Secondary</Badge>
              <Badge color="lightsuccess">Success</Badge>
              <Badge color="lightinfo">Info</Badge>
              <Badge color="lightwarning">Warning</Badge>
              <Badge color="lighterror">Danger</Badge>
            </div>
          </CardBox>
    </>
  )
}

export default LightBadges
