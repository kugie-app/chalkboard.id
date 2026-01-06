"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import CardBox from '../../shared/CardBox'


const TransitionDropdown = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Transitions</h4>
        </div>
        <Menu>
          <MenuButton className="ui-button  bg-success gap-2">
            My Account <Icon icon="solar:alt-arrow-down-outline" height={18} />
          </MenuButton>
          <MenuItems transition anchor="bottom" className="ui-dropdown origin-top transition duration-500 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
            <MenuItem>
              <a className="ui-dropdown-item" href="/settings">
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a className="ui-dropdown-item" href="/support">
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <a className="ui-dropdown-item" href="/license">
                License
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </CardBox>
    </div>
  )
}

export default TransitionDropdown
