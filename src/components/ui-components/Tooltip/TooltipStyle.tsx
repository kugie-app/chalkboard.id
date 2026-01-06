import React from "react";
import TooltipStyleCode from "@/components/ui-components/Tooltip/Code/TooltipStyleCode";
import CardBox from "@/components/shared/CardBox";
import { Button, Tooltip } from "flowbite-react";
const TooltipStyle = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Tooltip Styles</h4>
          <TooltipStyleCode />
        </div>
        <div className="flex gap-2 mt-2" >
          <Tooltip content="Tooltip content" style="light">
            <Button color="primary">Light Tooltip</Button>
          </Tooltip>
          <Tooltip content="Tooltip content" style="dark">
            <Button color="secondary">Dark Tooltip</Button>
          </Tooltip>
        </div>
      </CardBox>
    </div>
  );
};

export default TooltipStyle;
