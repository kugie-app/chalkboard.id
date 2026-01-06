import CodeModal from '@/components/ui-components/CodeModal'
import React from 'react'

const DropdwonWidthCode = () => {
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
    <MenuButton className="ui-button  bg-secondary gap-2">
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
                    `}
      </CodeModal>
    </div>
  )
}

export default DropdwonWidthCode
