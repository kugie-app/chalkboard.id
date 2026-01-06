import { Tooltip, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import PlacementTooltipCode from "./Code/PlacementTooltipCode";

const TooltipPlacement = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Tooltip Placement</h4>
          <PlacementTooltipCode />
        </div>
        <div className="flex flex-wrap items-center gap-5 mt-2">
          <div>
            <Tooltip content="Tooltip content" placement="top">
              <Button color={"primary"}>Tooltip top</Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Tooltip content" placement="right">
              <Button color="secondary">Tooltip right</Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Tooltip content" placement="bottom">
              <Button color="info">Tooltip bottom</Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Tooltip content" placement="left">
              <Button color="success">Tooltip left</Button>
            </Tooltip>
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default TooltipPlacement;
