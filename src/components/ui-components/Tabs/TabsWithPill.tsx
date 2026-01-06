"use client";
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Tabs } from 'flowbite-react'
import TabsPillcode from './Code/TabsPillcode';

const TabsWithPill = () => {
  return (
    <div>
        <CardBox>
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Tabs With Pills</h4>
             <TabsPillcode/>
          </div>
          <div className='mt-2'>
            <Tabs aria-label="Pills" >
              <Tabs.Item active title="Tab 1" className='rounded-t-lg'>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content 1
                </p>
              </Tabs.Item>
              <Tabs.Item title="Tab 2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content 2
                </p>
              </Tabs.Item>
              <Tabs.Item title="Tab 3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content 3
                </p>
              </Tabs.Item>
              <Tabs.Item title="Tab 4"> 
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content 4
                </p>
              </Tabs.Item>
              <Tabs.Item disabled title="Tab 5">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Content 5
                </p>
              </Tabs.Item>
            </Tabs>
          </div>
        </CardBox>
    </div>
  )
}

export default TabsWithPill
