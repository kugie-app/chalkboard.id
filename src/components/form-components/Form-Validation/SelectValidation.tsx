"use client";
import { Label, Select, Button } from "flowbite-react";
import React, { useState } from "react";
import TitleCard from "../../shared/TitleBorderCard";

const SelectValidation = () => {
    // Select Button
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmitt = () => {
    alert(Number(selectedValue));
  };
  return (
    <div>
      <TitleCard title="Select">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="age" value="Age" />
            </div>
            <Select
              id="age"
              className="select-md"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">None</option>
              <option value="10">Ten</option>
              <option value="20">Twenty</option>
              <option value="30">Thirty</option>
            </Select>
          </div>
          <div className="col-span-12 flex items-center gap-[1rem] justify-end">
            <Button
              type="submit"
              color="primary"
              onClick={handleSubmitt}
            >
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default SelectValidation;
