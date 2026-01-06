import React from "react";
import CodeModal from "../../CodeModal";

const DropdownPlacementCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Dropdown } from "flowbite-react";
    
    <div className="flex flex-wrap gap-4">
      <Dropdown label="Dropdown top" placement="top" color="primary">
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Dropdown label="Dropdown right" placement="right" color="secondary">
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Dropdown label="Dropdown bottom" placement="bottom" color="info">
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Dropdown label="Dropdown left" placement="left" color="success">
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Dropdown label="Dropdown left start" placement="left-start" color="error">
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
      <Dropdown label="Dropdown right start" placement="right-start" color="dark">
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

export default DropdownPlacementCode;
