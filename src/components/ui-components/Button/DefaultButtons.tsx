import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";
import DefaultButtonCode from "./Code/DefaultButtonCode";

const DefaultButtons = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Default Buttons</h4>
          <DefaultButtonCode />
        </div>
        <div className="flex gap-4 flex-wrap mt-2">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="info">Info</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Danger</Button>
          <Button color="light">Light</Button>
          <Button color="dark">Dark</Button>
        </div>
      </CardBox>
    </>
  );
};

export default DefaultButtons;
