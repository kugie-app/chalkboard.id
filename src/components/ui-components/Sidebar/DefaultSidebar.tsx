"use client";
import React from "react";
import {
  IconBrandTrello,
  IconInbox,
  IconLayoutDashboard,
  IconLogin2,
  IconShoppingBag,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import { Sidebar } from "flowbite-react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";
const DefaultSidebar = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold mb-2">Default Sidebar</h4>
          <CodeModal>
            {`
    import { Sidebar } from "flowbite-react";        
    import { IconBrandTrello, IconInbox, IconLayoutDashboard, IconLogin2, IconShoppingBag, IconUser, IconUserPlus,  } from "@tabler/icons-react";

    <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={() => <IconLayoutDashboard size={20} />}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={() => <IconBrandTrello size={20} />}
                label="Pro"
                labelColor="dark"
              >
                Kanban
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={() => <IconInbox size={20} />}
                label="3"
              >
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

        <Sidebar aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={() => <IconLayoutDashboard size={20} />}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={() => <IconBrandTrello size={20} />}
                label="Pro"
                labelColor="dark"
              >
                Kanban
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={() => <IconInbox size={20} />}
                label="3"
              >
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

export default DefaultSidebar;
