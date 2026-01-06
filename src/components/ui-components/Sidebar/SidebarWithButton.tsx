"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import {
  IconLayoutDashboard,
  IconBrandTrello,
  IconInbox,
  IconUser,
} from "@tabler/icons-react";
import { Sidebar, Badge } from "flowbite-react";
import CodeModal from "../CodeModal";

const SidebarWithButton = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold mb-2">Sidebar with button</h4>
          <CodeModal>
            {`
    import { Sidebar } from "flowbite-react";
    import { IconBrandShopee, IconBrandTrello, IconFileText, IconInbox, IconInfoSquareRounded, IconLayoutDashboard, IconLogin2, IconShoppingBag, IconUser, IconUserPlus, IconWorldUpload } from "@tabler/icons-react";

    <Sidebar aria-label="Sidebar with call to action button example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="#" icon={() => <IconLayoutDashboard size={20} />}>
                    Dashboard
                  </Sidebar.Item>
                  <Sidebar.Item href="#" icon={() => <IconBrandTrello size={20} />}>
                    Kanban
                  </Sidebar.Item>
                  <Sidebar.Item href="#" icon={() => <IconInbox size={20} />}>
                    Inbox
                  </Sidebar.Item>
                  <Sidebar.Item href="#" icon={() => <IconUser size={20} />}>
                    Users
                  </Sidebar.Item>
                 
                </Sidebar.ItemGroup>
              </Sidebar.Items>
              <Sidebar.CTA>
                <div className="mb-3 flex items-center">
                  <Badge color="warning">Beta</Badge>
                  <button
                    aria-label="Close"
                    className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                    type="button"
                  >
                    <svg
                      aria-hidden
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
                  Preview the new Flowbite dashboard navigation! You can turn
                  the new navigation off for a limited time in your profile.
                </div>
                <a
                  className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
                  href="#"
                >
                  Turn new navigation off
                </a>
              </Sidebar.CTA>
      </Sidebar> 
              `}
          </CodeModal>
        </div>

        <Sidebar aria-label="Sidebar with call to action button example">
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
              <Sidebar.Item href="#" icon={() => <IconUser size={20} />}>
                Users
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
          <Sidebar.CTA>
            <div className="mb-3 flex items-center">
              <Badge color="warning">Beta</Badge>
              <button
                aria-label="Close"
                className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-gray-100 p-1 text-cyan-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                type="button"
              >
                <svg
                  aria-hidden
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-3 text-sm text-cyan-900 dark:text-gray-400">
              Preview the new Flowbite dashboard navigation! You can turn the
              new navigation off for a limited time in your profile.
            </div>
            <a
              className="text-sm text-cyan-900 underline hover:text-cyan-800 dark:text-gray-400 dark:hover:text-gray-300"
              href="#"
            >
              Turn new navigation off
            </a>
          </Sidebar.CTA>
        </Sidebar>
      </CardBox>
    </div>
  );
};

export default SidebarWithButton;
