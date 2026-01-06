"use client";
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Dropdown } from 'flowbite-react'
import DropdownPlacementCode from './Code/DropdownPlacementCode';

const DropdownPalcements = () => {
  return (
    <div>
        <CardBox>
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Placement Options</h4>
            <DropdownPlacementCode/>
          </div>
          <div className="flex flex-wrap gap-4">
            <Dropdown label="Dropdown top" placement="top" color="primary">
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Dropdown right" placement="right" color="secondary">
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Dropdown bottom" placement="bottom" color="info">
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Dropdown left" placement="left" color="success">
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Dropdown left start" placement="left-start" color="error">
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
            <Dropdown label="Dropdown right start" placement="right-start" color="dark">
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </CardBox>
    </div>
  )
}

export default DropdownPalcements
