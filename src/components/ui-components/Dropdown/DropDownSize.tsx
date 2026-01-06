"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Dropdown } from "flowbite-react";
import DropdownSizesCode from "./Code/DropdownSizesCode";

const DropDownSize = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Dropdown sizes</h4>
          <DropdownSizesCode />
        </div>
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
      </CardBox>
    </div>
  );
};

export default DropDownSize;
