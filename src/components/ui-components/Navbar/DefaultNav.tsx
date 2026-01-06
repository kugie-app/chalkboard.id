"use client";
import FullLogo from "@/components/layout/shared/logo/FullLogo";
import { Navbar } from "flowbite-react";
import Link from "next/link";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const DefaultNav = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default Navbar</h4>
          <CodeModal>
            {`
       import {Navbar } from "flowbite-react";
      
       <Navbar fluid className="rounded-md">
          <FullLogo />
          <Navbar.Toggle />
          <Navbar.Collapse className="overflow-x-auto">
            <Navbar.Link href="#" active className="text-primary">
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} href="#">
              About
            </Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
                `}
          </CodeModal>
        </div>

        <Navbar fluid className="rounded-md">
          <FullLogo />
          <Navbar.Toggle />
          <Navbar.Collapse className="overflow-x-auto">
            <Navbar.Link href="#" active className="text-primary">
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} href="#">
              About
            </Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </CardBox>
    </div>
  );
};

export default DefaultNav;
