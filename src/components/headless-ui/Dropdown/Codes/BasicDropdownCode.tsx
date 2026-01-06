import React from "react";
import CodeModal from "../../../ui-components/CodeModal";

const BasicDropdownCode = () => {
  return (
    <div>
      <CodeModal>
        {`
"use client";
import React from "react";
import CardBox from "../shared/CardBox";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Icon } from "@iconify/react";
        
<Menu>
    <MenuButton className="ui-button bg-primary gap-2">
    Options
    <Icon icon="solar:alt-arrow-down-outline" height={18} />
    </MenuButton>
    <MenuItems transition anchor="bottom" className="ui-dropdown ui-dropdown-animation">
    <MenuItem>
        <button className="ui-dropdown-item group">
        <Icon icon="solar:pen-new-square-outline" height={18} />
        Edit
        <kbd className="ms-auto hidden text-xs text-bodytext group-data-[focus]:inline ">
            ⌘E
        </kbd>
        </button>
    </MenuItem>
    <MenuItem>
        <button className="ui-dropdown-item group ">
        <Icon icon="solar:copy-outline" height={18} />
        Duplicate
        <kbd className="ms-auto hidden text-xs text-bodytext group-data-[focus]:inline">
            ⌘D
        </kbd>
        </button>
    </MenuItem>
    <MenuItem>
        <button className="ui-dropdown-item group ">
        <Icon icon="solar:archive-check-broken" height={18} />
        Archive
        <kbd className="ms-auto hidden text-xs text-bodytext group-data-[focus]:inline">
            ⌘A
        </kbd>
        </button>
    </MenuItem>
    <MenuItem>
        <button className="ui-dropdown-item group ">
        <Icon
            icon="solar:trash-bin-minimalistic-2-outline"
            height={18}
        />
        Delete
        <kbd className="ms-auto hidden text-xs text-bodytext group-data-[focus]:inline">
            ⌘D
        </kbd>
        </button>
    </MenuItem>
    </MenuItems>
</Menu>  
                    `}
      </CodeModal>
    </div>
  );
};

export default BasicDropdownCode;
