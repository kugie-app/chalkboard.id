"use client";
import FullLogo from "@/components/layout/shared/logo/FullLogo";
import { Navbar, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const CTANav = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Navbar With CTA Button</h4>
          <CodeModal>
            {`
      import { Button, Navbar } from "flowbite-react";
      
      <Navbar fluid className="rounded-md">
        <FullLogo/>
          <div className="flex md:order-2">
            <Button color="primary">Get started</Button>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse className="overflow-x-auto">
            <Navbar.Link href="#" active className="text-primary">
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
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
          <div className="flex md:order-2">
            <Button color="primary" className="me-1">
              Get started
            </Button>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse className="overflow-x-auto">
            <Navbar.Link href="#" active className="text-primary">
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </CardBox>
    </div>
  );
};

export default CTANav;
