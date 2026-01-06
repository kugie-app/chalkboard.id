import React from "react";
import CodeModal from "../../CodeModal";

const FullWidthMegamenuCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { MegaMenu, Navbar } from 'flowbite-react'
    import { HiChevronDown } from "react-icons/hi";
    
    <MegaMenu className="rounded-md">
      <FullLogo/>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link>
          <MegaMenu.DropdownToggle>
            Company
            <HiChevronDown className="ml-2" />
          </MegaMenu.DropdownToggle>
        </Navbar.Link>
        <Navbar.Link href="/">Marketplace</Navbar.Link>
        <Navbar.Link href="/">Resources</Navbar.Link>
        <Navbar.Link href="/">Contact</Navbar.Link>
      </Navbar.Collapse>
      <MegaMenu.Dropdown>
        <ul className="mx-auto mt-6 grid max-w-screen-xl border-y border-border dark:border-darkborder px-4 py-5 sm:grid-cols-2 md:grid-cols-3 md:px-6">
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Online Stores</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Segmentation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Marketing CRM</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Online Stores</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Segmentation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Marketing CRM</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Audience Management</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Creative Tools</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="font-semibold">Marketing Automation</div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Connect with third-party tools that you're already
                using.
              </span>
            </a>
          </li>
        </ul>
      </MegaMenu.Dropdown>
    </MegaMenu>  
                `}
      </CodeModal>
    </div>
  );
};

export default FullWidthMegamenuCode;
