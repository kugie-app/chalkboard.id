"use client"
import { IconCalendarMonth } from '@tabler/icons-react'
import { Datepicker } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'
import CodeModal from '../CodeModal'

const TitleDatePicker = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">With Title</h4>
          <CodeModal>
            {`
    import { Datepicker } from "flowbite-react";
    import { IconCalendarMonth } from '@tabler/icons-react'

    <Datepicker title="DatePicker Title" className="form-control" icon={() => <IconCalendarMonth size={20} />} />
              `}
          </CodeModal>
        </div>

        <Datepicker title="DatePicker Title" className="form-control" icon={() => <IconCalendarMonth size={20} />} />
      </CardBox>
    </div>
  )
}

export default TitleDatePicker
