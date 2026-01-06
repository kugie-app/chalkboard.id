"use client";
import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import { CustomizerContext } from "@/app/context/CustomizerContext";

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const { activeDir } = useContext(CustomizerContext);
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="relative">
          <button
            className="h-10 w-10 hover:text-primary text-darklink hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary"
            onClick={() => setIsOpen(true)}
          >
            <Icon icon="solar:cart-large-minimalistic-linear" height={22} />
          </button>
          <span className="rounded-full absolute end-1 top-[4px] bg-info text-[10px] h-4 w-4 flex justify-center items-center text-white">
            0
          </span>
        </div>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position={`${activeDir === "rtl" ? 'left' : 'right'}`} className="dark:bg-darkgray max-w-[350px] w-full">

        <div className="border-ld  border-b">
          <div className="flex justify-between items-center p-4">
            <h5 className="text-xl">Shopping Cart</h5>
            <Drawer.Header title="" titleIcon={() => <></>} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};
