"use client";
import { List } from 'flowbite-react'
import React from 'react'
import CardBox from '../../shared/CardBox'
import { HiCheckCircle } from "react-icons/hi";
const IconListTypo = () => {
  return (
    <div>
        <CardBox>
            <h4 className="text-lg font-semibold mb-2">Icons</h4>
            <List>
              <List.Item icon={HiCheckCircle}>
                At least 10 characters (and up to 100 characters)
              </List.Item>
              <List.Item icon={HiCheckCircle}>
                At least one lowercase character
              </List.Item>
              <List.Item icon={HiCheckCircle}>
                Inclusion of at least one special character, e.g., ! @ # ?
              </List.Item>
            </List>
          </CardBox>
    </div>
  )
}

export default IconListTypo
