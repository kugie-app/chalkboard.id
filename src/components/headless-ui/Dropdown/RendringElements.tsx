"use client";
import React, { forwardRef } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
let MyCustomButton = forwardRef(function (props: any, ref: any) {
  return <button className="..." ref={ref} {...props} />;
});

const RendringElements = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Rendering Elements</h4>
        </div>
        <Menu>
          <MenuButton
            as={MyCustomButton}
            className="ui-button  bg-secondary gap-2"
          >
            My account <Icon icon="solar:alt-arrow-down-outline" height={18} />
          </MenuButton>
          <MenuItems anchor="bottom" as="section" className="ui-dropdown ui-dropdown-animation">
            <MenuItem as="a" className="ui-dropdown-item" href="/settings">
              Settings
            </MenuItem>
            <MenuItem as="a" className="ui-dropdown-item" href="/support">
              Support
            </MenuItem>
            <MenuItem as="a" className="ui-dropdown-item" href="/license">
              License
            </MenuItem>
          </MenuItems>
        </Menu>
      </CardBox>
    </div>
  );
};

export default RendringElements;
