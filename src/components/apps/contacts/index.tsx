"use client";
import CardBox from "@/components/shared/CardBox";
import ContactFilter from "@/components/apps/contacts/ContactFilter";
import ContactSearch from "@/components/apps/contacts/ContactSearch";
import { ContactContextProvider } from "@/app/context/Conatactcontext";

import ContactListItem from "@/components/apps/contacts/ContactListItem";
import ContactList from "@/components/apps/contacts/ContactList";
import { Drawer } from "flowbite-react";
import { useState } from "react";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const [isOpenContact, setIsOpenContact] = useState(false);

  return (
    <>
      <ContactContextProvider>
        <CardBox className="p-0 overflow-hidden">
          <div className="flex">
            {/* ------------------------------------------- */}
            {/* Left Part */}
            {/* ------------------------------------------- */}
            <Drawer
              open={isOpen}
              onClose={handleClose}
              className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent max-w-[235px] w-full lg:z-[0]"
            >
              <ContactFilter />
            </Drawer>

            {/* ------------------------------------------- */}
            {/* Middle part */}
            {/* ------------------------------------------- */}
            <div className="left-part lg:max-w-[340px] max-w-full lg:border-e lg:border-ld border-e-0  w-full px-0 pt-0">
              <ContactSearch onClick={() => setIsOpen(true)} />
              <ContactList openContact={setIsOpenContact} />
            </div>

            {/* ------------------------------------------- */}
            {/* Detail part */}
            {/* ------------------------------------------- */}
            <ContactListItem openContactValue={isOpenContact} onCloseContact={() => setIsOpenContact(false)} />
          </div>
        </CardBox>
      </ContactContextProvider>
    </>
  )
}

export default index
