import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const GroupItemCode = () => {
  return (
    <div>
      <CodeModal>
        {`
"use client";
import React from "react";
import CardBox from "../shared/CardBox";
import {  
  Menu,
  MenuButton,
  MenuItems,
  MenuSection,
  MenuHeading,
  MenuItem,
  MenuSeparator, } from "@headlessui/react";
import { Icon } from "@iconify/react";
        
<Menu>
    <MenuButton className="ui-button bg-primary gap-2">
    My Groups
    <Icon icon="solar:alt-arrow-down-outline" height={18} />
    </MenuButton>
    <MenuItems transition anchor="bottom" className="ui-dropdown ui-dropdown-animation">
    <MenuSection>
        <MenuHeading className="text-ld text-sm font-semibold px-4 py-1">
        Settings
        </MenuHeading>
        <MenuItem>
        <a className="ui-dropdown-item" href="/profile">
            My profile
        </a>
        </MenuItem>
        <MenuItem>
        <a className="ui-dropdown-item" href="/notifications">
            Notifications
        </a>
        </MenuItem>
    </MenuSection>
    <MenuSeparator className="my-1 h-px bg-border dark:bg-darkborder" />
    <MenuSection>
        <MenuHeading className="text-ld text-sm font-semibold px-4 py-1">
        Support
        </MenuHeading>
        <MenuItem>
        <a className="ui-dropdown-item" href="/support">
            Documentation
        </a>
        </MenuItem>
        <MenuItem>
        <a className="ui-dropdown-item" href="/license">
            License
        </a>
        </MenuItem>
    </MenuSection>
    </MenuItems>
</Menu>
                    `}
      </CodeModal>
    </div>
  );
};

export default GroupItemCode;
