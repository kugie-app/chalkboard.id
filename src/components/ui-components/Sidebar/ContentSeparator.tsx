"use client";
import { IconLayoutDashboard, IconBrandTrello, IconInbox, IconWorldUpload, IconFileText, IconInfoSquareRounded, IconUserPlus } from "@tabler/icons-react";
import { Sidebar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const ContentSeparator = () => {
  return (
    <div>
      <CardBox className="pb-12">
      <div className="flex items-center justify-between mb-2">
      <h4 className="text-lg font-semibold mb-2">Content Separator</h4>
          <CodeModal>
            {`
    import { Sidebar } from "flowbite-react";
    import { IconBrandShopee, IconBrandTrello, IconFileText, IconInbox, IconInfoSquareRounded, IconLayoutDashboard, IconLogin2, IconShoppingBag, IconUser, IconUserPlus, IconWorldUpload } from "@tabler/icons-react";

    <Sidebar aria-label="Sidebar with content separator example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={() => <IconLayoutDashboard size={20} />}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconBrandTrello size={20} />}>
                Kanban
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconInbox size={20} />}>
                Inbox
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={() => <IconWorldUpload size={20} />}>
                Upgrade to Pro
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconFileText size={20} />}>
                Documentation
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={() => <IconInfoSquareRounded size={20} />}
              >
                Help
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
        
        <Sidebar aria-label="Sidebar with content separator example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={() => <IconLayoutDashboard size={20} />}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconBrandTrello size={20} />}>
                Kanban
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconInbox size={20} />}>
                Inbox
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={() => <IconWorldUpload size={20} />}>
                Upgrade to Pro
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={() => <IconFileText size={20} />}>
                Documentation
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={() => <IconInfoSquareRounded size={20} />}
              >
                Help
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

export default ContentSeparator;
