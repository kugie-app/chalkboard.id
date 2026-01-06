import { Progress } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'
import ProgressSizeCode from './Code/ProgressSizeCode'

const ProgressSize = () => {
  return (
    <div>
       <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Progress Bar Sizing</h4>
          <ProgressSizeCode/>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-base font-medium dark:text-white">Small</div>
          <Progress progress={45} size="sm" color="primary" />
          <div className="text-base font-medium dark:text-white">Default</div>
          <Progress progress={45} size="md" color="primary" />
          <div className="text-lg font-medium dark:text-white">Large</div>
          <Progress progress={45} size="lg" color="primary" />
          <div className="text-lg font-medium dark:text-white">Extra Large</div>
          <Progress progress={45} size="xl" color="primary" />
        </div>
      </CardBox>

    </div>
  )
}

export default ProgressSize
