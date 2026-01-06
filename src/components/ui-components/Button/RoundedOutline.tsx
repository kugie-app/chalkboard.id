import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";
import OutlinePillButtonCode from "./Code/OutlinePillButtonCode";

const RoundedOutline = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Rounded Outlined Buttons</h4>
          <OutlinePillButtonCode />
        </div>
        <div className="flex gap-4 flex-wrap mt-2">
          <Button
            color="primary"
            className="border border-primary text-primary hover:bg-primary hover:text-white"
            pill
            outline
          >
            Primary
          </Button>
          <Button
            color="secondary"
            className="border border-secondary text-secondary hover:bg-secondary hover:text-white"
            pill
            outline
          >
            Secondary
          </Button>
          <Button
            color="success"
            className="border border-success text-success hover:bg-success hover:text-white"
            pill
            outline
          >
            Success
          </Button>
          <Button
            color="info"
            className="border border-info text-info hover:bg-info hover:text-white"
            pill
            outline
          >
            Info
          </Button>
          <Button
            color="warning"
            className="border border-warning text-warning hover:bg-warning hover:text-white"
            pill
            outline
          >
            Warning
          </Button>
          <Button
            color="error"
            className="border border-error text-error hover:bg-error hover:text-white"
            pill
            outline
          >
            Danger
          </Button>
          <Button color="light" className="" pill outline>
            Light
          </Button>
          <Button
            color="dark"
            className="border border-dark text-dark hover:bg-dark hover:text-white dark:text-white"
            pill
            outline
          >
            Dark
          </Button>
        </div>
      </CardBox>
    </>
  );
};

export default RoundedOutline;
