"use client";
import {
  IconLayoutDashboard,
  IconBrandShopee,
  IconInbox,
  IconUser,
  IconShoppingBag,
  IconLogin2,
  IconUserPlus,
} from "@tabler/icons-react";
import { Sidebar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import CodeModal from "../CodeModal";
const CustomDropdownIcon = () => {
  return (
    <div>
      <CardBox>
      <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-semibold mb-2">
          Custom Dropdown Icon
        </h4>
          <CodeModal>
            {`
    import { Sidebar } from "flowbite-react";
    import { IconBrandShopee, IconBrandTrello, IconFileText, IconInbox, IconInfoSquareRounded, IconLayoutDashboard, IconLogin2, IconShoppingBag, IconUser, IconUserPlus, IconWorldUpload } from "@tabler/icons-react";
    import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
    
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={() => <IconLayoutDashboard size={20} />}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={() => <IconBrandShopee size={20} />}
                label="E-commerce"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

                  return (
                    <IconComponent
                      aria-hidden
                      className={twMerge(
                        theme.label.icon.open[open ? "on" : "off"]
                      )}
                    />
                  );
                }}
              >
                <Sidebar.Item href="#">Products</Sidebar.Item>
                <Sidebar.Item href="#">Sales</Sidebar.Item>
                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                <Sidebar.Item href="#">Shipping</Sidebar.Item>
                <Sidebar.Item href="#">User</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item href="#" icon={() => <IconInbox size={20} />}>
                Inbox
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconUser size={20} />}>
                Users
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconShoppingBag size={20} />}>
                Products
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconLogin2 size={20} />}>
                Sign In
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconUserPlus size={20} />}>
                Sign Up
              </Sidebar.Item>

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>  
              `}
          </CodeModal>
        </div>
        
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={() => <IconLayoutDashboard size={20} />}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={() => <IconBrandShopee size={20} />}
                label="E-commerce"
                renderChevronIcon={(theme, open) => {
                  const IconComponent = open
                    ? HiOutlineMinusSm
                    : HiOutlinePlusSm;

                  return (
                    <IconComponent
                      aria-hidden
                      className={twMerge(
                        theme.label.icon.open[open ? "on" : "off"]
                      )}
                    />
                  );
                }}
              >
                <Sidebar.Item href="#">Products</Sidebar.Item>
                <Sidebar.Item href="#">Sales</Sidebar.Item>
                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                <Sidebar.Item href="#">Shipping</Sidebar.Item>
                <Sidebar.Item href="#">User</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Item href="#" icon={() => <IconInbox size={20} />}>
                Inbox
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconUser size={20} />}>
                Users
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconShoppingBag size={20} />}>
                Products
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconLogin2 size={20} />}>
                Sign In
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconUserPlus size={20} />}>
                Sign Up
              </Sidebar.Item>

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </CardBox>
    </div>
  );
};

export default CustomDropdownIcon;
