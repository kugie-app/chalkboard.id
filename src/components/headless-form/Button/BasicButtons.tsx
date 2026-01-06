import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "@headlessui/react";
import BasicButtonsCode from "./Codes/BasicButtonsCode";
const BasicButtons = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Basic Buttons</h4>
          <BasicButtonsCode/>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button className="ui-button bg-primary">
            Primary
          </Button>
          <Button className="ui-button bg-secondary">
          Secondary
          </Button>
          <Button className="ui-button bg-success">
            Success
          </Button>
          <Button className="ui-button bg-error">
            Error
          </Button>
          <Button className="ui-button bg-warning">
            Warning
          </Button>
          <Button className="ui-button bg-info">
            Info
          </Button>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicButtons;
