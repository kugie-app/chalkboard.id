"use client";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import CardBox from '../../shared/CardBox'
import { AnimatePresence, motion } from 'framer-motion'
const FramerMotion = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Framer Motion</h4>
        </div>
        <Menu>
      {({ open }) => (
        <>
          <MenuButton className="ui-button  bg-error gap-2">
          My Account <Icon icon="solar:alt-arrow-down-outline" height={18} /></MenuButton>
          <AnimatePresence>
            {open && (
              <MenuItems
                static
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                anchor="bottom"
                className="origin-top ui-dropdown "
              >
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
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
      </CardBox>
    </div>
  )
}

export default FramerMotion
