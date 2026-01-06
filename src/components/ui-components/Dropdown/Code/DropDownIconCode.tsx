import React from "react";
import CodeModal from "../../CodeModal";

const DropDownIconCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Dropdown } from "flowbite-react";
    import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

    <Dropdown label="Dropdown" color="info">
      <Dropdown.Header>
        <span className="block text-sm">Bonnie Green</span>
        <span className="block truncate text-sm font-medium">
          bonnie@flowbite.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
      <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
    </Dropdown>

    <h4 className="text-lg font-semibold">Inline dropdown</h4>
    <Dropdown label="Dropdown" inline>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>  
                `}
      </CodeModal>
    </div>
  );
};

export default DropDownIconCode;
