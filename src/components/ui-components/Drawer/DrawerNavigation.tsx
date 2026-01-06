"use client";
import {
  IconLayoutDashboard,
  IconShoppingBag,
  IconListDetails,
  IconLogin2,
  IconUserPlus,
  IconFiles,
  IconComponents,
  IconInfoSquareRounded,
} from "@tabler/icons-react";
import { HiSearch } from "react-icons/hi";
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import NavigationDrawerCode from "./Code/NavigationDrawerCode";

const DrawerNavigation = () => {
  const [isNavigation, setIsNavigation] = useState(false);
  const navigationClose = () => setIsNavigation(false);
  return (
    <div>
      <div>
        <CardBox>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold">Navigation</h4>
            <NavigationDrawerCode />
          </div>
          <Button color={"secondary"} onClick={() => setIsNavigation(true)}>
            Show Navigation
          </Button>

          <Drawer open={isNavigation} onClose={navigationClose} className="p-4">
            <Drawer.Header title="MENU" titleIcon={() => <></>} />
            <Drawer.Items>
              <Sidebar
                aria-label="Sidebar with multi-level dropdown example"
                className="[&>div]:bg-transparent [&>div]:p-0"
              >
                <div className="flex h-full flex-col justify-between py-2">
                  <div>
                    <form className="pb-3 md:hidden">
                      <TextInput
                        icon={HiSearch}
                        type="search"
                        placeholder="Search"
                        required
                        size={32}
                      />
                    </form>
                    <Sidebar.Items>
                      <Sidebar.ItemGroup>
                        <Sidebar.Item
                          href="/"
                          icon={() => <IconLayoutDashboard size={20} />}
                        >
                          Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item
                          href="/e-commerce/products"
                          icon={() => <IconShoppingBag size={20} />}
                        >
                          Products
                        </Sidebar.Item>
                        <Sidebar.Item
                          href="/users/list"
                          icon={() => <IconListDetails size={20} />}
                        >
                          Users list
                        </Sidebar.Item>
                        <Sidebar.Item
                          href="/authentication/sign-in"
                          icon={() => <IconLogin2 size={20} />}
                        >
                          Sign in
                        </Sidebar.Item>
                        <Sidebar.Item
                          href="/authentication/sign-up"
                          icon={() => <IconUserPlus size={20} />}
                        >
                          Sign up
                        </Sidebar.Item>
                      </Sidebar.ItemGroup>
                      <Sidebar.ItemGroup>
                        <Sidebar.Item
                          href="https://github.com/themesberg/flowbite-react/"
                          icon={() => <IconFiles size={20} />}
                        >
                          Docs
                        </Sidebar.Item>
                        <Sidebar.Item
                          href="https://flowbite-react.com/"
                          icon={() => <IconComponents size={20} />}
                        >
                          Components
                        </Sidebar.Item>
                        <Sidebar.Item
                          href="https://github.com/themesberg/flowbite-react/issues"
                          icon={() => <IconInfoSquareRounded size={20} />}
                        >
                          Help
                        </Sidebar.Item>
                      </Sidebar.ItemGroup>
                    </Sidebar.Items>
                  </div>
                </div>
              </Sidebar>
            </Drawer.Items>
          </Drawer>
        </CardBox>
      </div>
    </div>
  );
};

export default DrawerNavigation;
