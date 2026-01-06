"use client";
import { Button, Tabs, TabsRef } from "flowbite-react";
import React, { useRef, useState } from "react";
import CardBox from "../../shared/CardBox";
import { Icon } from "@iconify/react";
import StateTabsCode from "./Code/StateTabsCode";
const StateTabs = () => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">React state options</h4>
          <StateTabsCode/>
        </div>
        <div className="sm:flex flex-col gap-3">
          <Tabs
            aria-label="Default tabs"
            ref={tabsRef}
            onActiveTabChange={(tab) => setActiveTab(tab)}
          >
            <Tabs.Item
              active
              title="Profile"
              icon={() => <Icon icon="solar:shield-user-outline" height={20} />}
            >
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                Profile tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item
              title="Dashboard"
              icon={() => <Icon icon="solar:graph-linear" height={20} />}
            >
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                Dashboard tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item
              title="Settings"
              icon={() => <Icon icon="solar:settings-outline" height={20} />}
            >
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                Settings tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item
              title="Contacts"
              icon={() => (
                <Icon icon="solar:accessibility-linear" height={20} />
              )}
            >
              This is{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                Contacts tab's associated content
              </span>
              . Clicking another tab will toggle the visibility of this one for
              the next. The tab JavaScript swaps classes to control the content
              visibility and styling.
            </Tabs.Item>
            <Tabs.Item disabled title="Disabled">
              Disabled content
            </Tabs.Item>
          </Tabs>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Active tab: {activeTab}
          </div>
          <Button.Group className="md:flex hidden">
            <Button
              color="gray"
              onClick={() => tabsRef.current?.setActiveTab(0)}
            >
              Profile
            </Button>
            <Button
              color="gray"
              onClick={() => tabsRef.current?.setActiveTab(1)}
            >
              Dashboard
            </Button>
            <Button
              color="gray"
              onClick={() => tabsRef.current?.setActiveTab(2)}
            >
              Settings
            </Button>
            <Button
              color="gray"
              onClick={() => tabsRef.current?.setActiveTab(3)}
            >
              Contacts
            </Button>
          </Button.Group>
        </div>
      </CardBox>
    </div>
  );
};

export default StateTabs;
