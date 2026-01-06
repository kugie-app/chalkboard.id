"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Dropdown } from "flowbite-react";
import DropDownHeaderCode from "./Code/DropDownHeaderCode";

const DropDownHeader = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Dropdown Header</h4>
          <DropDownHeaderCode />
        </div>
        <Dropdown
          label="Dropdown Button"
          dismissOnClick={false}
          className="flex-wrap w-full"
          color="primary"
        >
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>

        <Dropdown label="Dropdown Button" color="secondary">
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
      </CardBox>
    </>
  );
};

export default DropDownHeader;
