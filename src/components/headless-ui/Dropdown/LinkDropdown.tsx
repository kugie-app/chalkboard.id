"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Icon } from "@iconify/react";
import LinkDropdownCode from "./Codes/LinkDropdownCode";

const LinkDropdown = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Links Dropdown</h4>
          <LinkDropdownCode />
        </div>
        <Menu>
          <MenuButton className="ui-button bg-secondary gap-2">
            My Account <Icon icon="solar:alt-arrow-down-outline" height={18} />
          </MenuButton>
          <MenuItems transition anchor="bottom" className="ui-dropdown ui-dropdown-animation">
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
  );
};

export default LinkDropdown;
