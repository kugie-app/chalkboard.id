"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import React from "react";
import CardBox from "../../shared/CardBox";
import MyCustomLink from "./MyCustomLink";
import { Icon } from "@iconify/react";

const ClosingManually = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Closing Manually</h4>
        </div>
        <Menu>
          <MenuButton className="ui-button  bg-primary gap-2">
            Terms <Icon icon="solar:alt-arrow-down-outline" height={18} />
          </MenuButton>
          <MenuItems anchor="bottom" className="ui-dropdown">
            <MenuItem>
              {({ close }) => (
                <MyCustomLink  href="/" onClick={close}>
                  Read and accept
                </MyCustomLink>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </CardBox>
    </div>
  );
};

export default ClosingManually;
