import React from "react";
import CardBox from "../../shared/CardBox";
import { Button, Tooltip } from "flowbite-react";
import DisableTooltipCode from "./Code/DisableTooltipCode";

const DisableTooltip = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Disable Arrow Tooltip</h4>
          <DisableTooltipCode />
        </div>
        <div className="mt-2">
          <Tooltip content="Tooltip content" arrow={false}>
            <Button color="info">Default Tooltip</Button>
          </Tooltip>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableTooltip;
