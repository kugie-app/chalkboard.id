import React from "react";
import CardBox from "../../shared/CardBox";
import { Button, Tooltip } from "flowbite-react";
import TooltipTriggerCode from "./Code/TooltipTriggerCode";

const TooltipTrigger = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Trigger Type</h4>
          <TooltipTriggerCode/>
        </div>
        <div className="flex gap-2 mt-2">
          <Tooltip content="Tooltip content" trigger="hover">
            <Button color="primary">Tooltip Hover</Button>
          </Tooltip>
          <Tooltip content="Tooltip content" trigger="click">
            <Button color="secondary">Tooltip Click</Button>
          </Tooltip>
        </div>
      </CardBox>
    </div>
  );
};

export default TooltipTrigger;
