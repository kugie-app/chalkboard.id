"use client";
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Dropdown } from 'flowbite-react'
import DropDownIconCode from './Code/DropDownIconCode'
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";
const DropdownWithIcon = () => {
  return (
    <>
        <CardBox>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Dropdown items with icon</h4>
              <DropDownIconCode/> 
            </div>
            <Dropdown label="Dropdown" color="info">
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  bonnie@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
              <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
              <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
            </Dropdown>

            <h4 className="text-lg font-semibold">Inline dropdown</h4>
            <Dropdown label="Dropdown" inline>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </CardBox>
    </>
  )
}

export default DropdownWithIcon
