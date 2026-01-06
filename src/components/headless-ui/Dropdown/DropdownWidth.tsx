"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Icon } from "@iconify/react";
import DropdwonWidthCode from "./Codes/DropdwonWidthCode";


const DropdownWidth = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Dropdown Width</h4>
          <DropdwonWidthCode/>
        </div>
        <Menu>
          <MenuButton className="ui-button  bg-primary gap-2">
            My Account <Icon icon="solar:alt-arrow-down-outline" height={18} />
          </MenuButton>
          <MenuItems transition anchor="bottom" className="ui-dropdown ui-dropdown-animation !w-80 !max-w-80">
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

export default DropdownWidth



