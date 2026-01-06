import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "@headlessui/react";
import DisableButtonsCode from "./Codes/DisableButtonsCode";

const DisableButton = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Disable Buttons</h4>
          <DisableButtonsCode />
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button className="ui-button bg-primary cursor-not-allowed" disabled>
            Primary
          </Button>
          <Button className="ui-button bg-secondary cursor-not-allowed" disabled>
            Secondary
          </Button>
          <Button className="ui-button bg-success cursor-not-allowed" disabled>
            Success
          </Button>
          <Button className="ui-button bg-error cursor-not-allowed" disabled>
            Error
          </Button>
          <Button className="ui-button bg-warning cursor-not-allowed" disabled>
            Warning
          </Button>
          <Button className="ui-button bg-info cursor-not-allowed" disabled>
            Info
          </Button>
        </div>
      </CardBox>
    </div>
  );
};

export default DisableButton;
