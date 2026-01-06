"use client";
import FullLogo from "@/components/layout/shared/logo/FullLogo";
import { MegaMenu, Navbar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { HiChevronDown,HiArrowRight } from "react-icons/hi";
const FullWidthCTA = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Full Width With CTA</h4>
        <MegaMenu className="rounded-md">
          <FullLogo />
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="/">Home</Navbar.Link>
            <MegaMenu.DropdownToggle>
              Company
              <HiChevronDown className="ml-2" />
            </MegaMenu.DropdownToggle>
            <Navbar.Link href="/">Marketplace</Navbar.Link>
            <Navbar.Link href="/">Resources</Navbar.Link>
            <Navbar.Link href="/">Contact</Navbar.Link>
          </Navbar.Collapse>
          <MegaMenu.Dropdown>
            <div className="mx-auto mt-6 grid max-w-screen-xl border-y border-border dark:border-darkborder px-4 py-5 text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
              <ul className="space-y-4 sm:mb-4 md:mb-0">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Online Stores
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Segmentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Marketing CRM
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Online Stores
                  </a>
                </li>
              </ul>
              <ul className="mb-4 hidden space-y-4 sm:block md:mb-0">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Our Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    License
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-500"
                  >
                    Resources
                  </a>
                </li>
              </ul>
              <div className="mt-4 md:mt-0">
                <h2 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Our brands
                </h2>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  At Flowbite, we have a portfolio of brands that cater to a
                  variety of preferences.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primaryemphasis dark:text-primary dark:hover:text-primaryemphasis"
                >
                  Explore our brands
                  <span className="sr-only">Explore our brands</span>
                  <HiArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </MegaMenu.Dropdown>
        </MegaMenu>
      </CardBox>
    </div>
  );
};

export default FullWidthCTA;
