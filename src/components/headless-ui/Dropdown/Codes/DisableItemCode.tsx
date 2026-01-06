import React from 'react'
import CodeModal from '../../../ui-components/CodeModal'

const DisableItemCode = () => {
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
        <a className="ui-dropdown-item data-[disabled]:opacity-50" href="/license">
        License
        </a>
    </MenuItem>
    <MenuItem disabled>
        <a className="ui-dropdown-item data-[disabled]:opacity-50" href="/logout">
        Logout
        </a>
    </MenuItem>
    </MenuItems>
</Menu>
                    `}
      </CodeModal>
    </div>
  )
}

export default DisableItemCode
