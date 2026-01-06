import React from "react";
import CardBox from "../../shared/CardBox";
import LightButtonCode from "./Code/LightButtoncode";
import { Button } from "flowbite-react";

const LightButtons = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">
            Light Buttons
          </h4>
          <LightButtonCode />
        </div>
        <div className="flex gap-4 flex-wrap mt-2">
          <Button color="lightprimary">Primary</Button>
          <Button color="lightsecondary">Secondary</Button>
          <Button color="lightsuccess">Success</Button>
          <Button color="lightinfo">Info</Button>
          <Button color="lightwarning">Warning</Button>
          <Button color="lighterror">Danger</Button>
        </div>
      </CardBox>
    </>
  );
};

export default LightButtons;
