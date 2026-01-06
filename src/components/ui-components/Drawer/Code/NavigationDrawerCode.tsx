import React from "react";
import CodeModal from "../../CodeModal";

const NavigationDrawerCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Button, Drawer } from "flowbite-react";
    import { useState } from "react";
    
    const [isNavigation, setIsNavigation] = useState(false);
    const navigationClose = () => setIsNavigation(false);
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
    `}
      </CodeModal>
    </div>
  );
};

export default NavigationDrawerCode;
