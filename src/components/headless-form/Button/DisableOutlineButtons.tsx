import React from "react";
import CardBox from "../../shared/CardBox";
import DisableOutlineBtn from "./Codes/DisableOutlineBtnCode";
import { Button } from "@headlessui/react";

const DisableOutlineButtons = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Disable Outlined Buttons</h4>
          <DisableOutlineBtn />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button
            className="ui-button border border-primary text-primary hover:bg-primary hover:text-white cursor-not-allowed"
            disabled
          >
            Primary
          </Button>
          <Button
            className="ui-button border border-secondary text-secondary hover:bg-secondary hover:text-white cursor-not-allowed"
            disabled
          >
            Secondary
          </Button>
          <Button
            className="ui-button border border-success text-success hover:bg-success hover:text-white cursor-not-allowed"
            disabled
          >
            Success
          </Button>
          <Button
            className="ui-button border border-error text-error hover:bg-error hover:text-white cursor-not-allowed"
            disabled
          >
            Error
          </Button>
          <Button
            className="ui-button border border-warning text-warning hover:bg-warning hover:text-white cursor-not-allowed"
            disabled
          >
            Warning
          </Button>
          <Button
            className="ui-button border border-info text-info hover:bg-info hover:text-white cursor-not-allowed"
            disabled
          >
            Info
          </Button>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableOutlineButtons;
