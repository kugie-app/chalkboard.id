"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import CardBox from "../../shared/CardBox";
import DisableItemCode from "./Codes/DisableItemCode";

const DisablingItem = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Disable Items</h4>
          <DisableItemCode />
        </div>
        <Menu>
          <MenuButton className="ui-button bg-error gap-2">
            My Profile <Icon icon="solar:alt-arrow-down-outline" height={18} />
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
            <MenuItem disabled>
              <a
                className="ui-dropdown-item data-[disabled]:opacity-50"
                href="/license"
              >
                License
              </a>
            </MenuItem>
            <MenuItem disabled>
              <a
                className="ui-dropdown-item data-[disabled]:opacity-50"
                href="/logout"
              >
                Logout
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </CardBox>
    </div>
  );
};

export default DisablingItem;
