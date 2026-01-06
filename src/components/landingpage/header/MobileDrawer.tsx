"use client";
import React, { useState } from "react";
import { Button, Drawer } from "flowbite-react";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import FullLogo from "@/components/layout/shared/logo/FullLogo";
import MobileDemosMenu from "./MobileDemoMenus";
const MobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <div className="xl:hidden flex">
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center text-dark  h-10 w-10 rounded-full bg-transparent hover:bg-lightprimary"
        >
          <IconMenu2 />
        </Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className="h-full">
        <Drawer.Items className="p-6">
          <FullLogo />
          <MobileDemosMenu />
          <Link
            className="block py-3 text-base text-dark dark:text-white font-semibold"
            href={"https://adminmart.github.io/premium-documentation/nextjs/matdash/index.html"}
          >
            Documentation
          </Link>
          <Link
            className="block py-3 text-base text-dark dark:text-white font-semibold"
            href={"https://adminmart.com/support/"}
          >
            Support
          </Link>
          <Button
            color={"primary"}
            className="mt-2"
            as={Link}
            href="/auth/auth2/login"
          >
            Login
          </Button>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
