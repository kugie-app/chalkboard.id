import { Button } from "@headlessui/react";
import React from "react";
import CardBox from "../../shared/CardBox";
import LightButtonsCode from "./Codes/LightButtonsCode";

const LightButtons = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Light Buttons</h4>
          <LightButtonsCode/>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button className="ui-button bg-lightprimary text-primary hover:bg-primary hover:text-white">Primary</Button>
          <Button className="ui-button bg-lightsecondary text-secondary hover:bg-secondary hover:text-white">Secondary</Button>
          <Button className="ui-button bg-lightsuccess text-success hover:bg-success hover:text-white">Success</Button>
          <Button className="ui-button bg-lighterror text-error hover:bg-error hover:text-white">Error</Button>
          <Button className="ui-button bg-lightwarning text-warning hover:bg-warning hover:text-white">Warning</Button>
          <Button className="ui-button bg-lightinfo text-info hover:bg-info hover:text-white">Info</Button>
        </div>
      </CardBox>
    </div>
  );
};

export default LightButtons;
