"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSeparator,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import SepratingItemsCode from "./Codes/SepratingItemsCode";

const SepratorDropdown = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Separating Items</h4>
          <SepratingItemsCode />
        </div>
        <Menu>
          <MenuButton className="ui-button bg-warning gap-2">
            My Account <Icon icon="solar:alt-arrow-down-outline" height={18} />
          </MenuButton>
          <MenuItems transition anchor="bottom" className="ui-dropdown ui-dropdown-animation">
            <MenuItem>
              <a className="ui-dropdown-item" href="/settings">
                Settings
              </a>
            </MenuItem>
            <MenuSeparator className="my-1 h-px bg-border dark:bg-darkborder" />
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

export default SepratorDropdown;
