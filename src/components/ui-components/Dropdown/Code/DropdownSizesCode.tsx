import React from "react";
import CodeModal from "../../CodeModal";

const DropdownSizesCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Dropdown } from "flowbite-react";
    
    <div className="flex flex-wrap items-center gap-4">
      <Dropdown label="Small dropdown" size="sm" color="success">
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Dropdown label="Large dropdown" size="lg" color="error">
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
                `}
      </CodeModal>
    </div>
  );
};

export default DropdownSizesCode;
