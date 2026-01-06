'use client'
import CardBox from "@/components/shared/CardBox";
import { Badge, Label, Select } from "flowbite-react";
import React, { useState } from "react";

const Status = () => {
  const [selectedStatus, setSelectedStatus] = useState("Publish");


  return (
    <>
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <h5 className="card-title">Status</h5>
          {selectedStatus === "Publish" ? (
            <Badge color={"success"} className="h-3 w-3 p-0"></Badge>
          ) : selectedStatus === "Schedule" ? (
            <Badge color={"indigo"} className="h-3 w-3 p-0"></Badge>
          ) : selectedStatus === "Draft" ? (
            <Badge color={"pink"} className="h-3 w-3 p-0"></Badge>
          ) : (
            <Badge color={"warning"} className="h-3 w-3 p-0"></Badge>
          )}
        </div>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="tax" value="Tax Class" />
            <span className="text-error ms-1">*</span>
          </div>
          <Select id="countries" className="select-md" required
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="Draft">Draft</option>
            <option value="Schedule">Schedule</option>
            <option value="Publish">Publish</option>
            <option value="Inactive">Inactive</option>
          </Select>
          <small className="text-xs text-darklink dark:text-bodytext">
            Set the product status.
          </small>
        </div>
      </CardBox >
    </>
  );
};

export default Status;
