import React from "react";
import CodeModal from "../../CodeModal";

const UnderlineTabsCode = () => {
  return (
    <div>
      <CodeModal>
        {`
      import { Tabs } from "flowbite-react";
      import { Icon } from "@iconify/react";

      <Tabs aria-label="Tabs with underline" variant="underline">
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
    `}
      </CodeModal>
    </div>
  );
};

export default UnderlineTabsCode;
