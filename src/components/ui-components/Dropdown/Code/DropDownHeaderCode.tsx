import React from "react";
import CodeModal from "../../CodeModal";

const DropDownHeaderCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Dropdown } from "flowbite-react";
    
    <Dropdown label="Dropdown button" dismissOnClick="{false}" className="flex-wrap" color="primary">
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>

    <Dropdown label="Dropdown button" color="secondary">
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">
          bonnie@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
                `}
      </CodeModal>
    </>
  );
};

export default DropDownHeaderCode;
