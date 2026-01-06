import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";
import OutlinePillButtonCode from "./Code/OutlinePillButtonCode";
import OutlineSqrButtonCode from "./Code/OutlineSqrButtton";

const SquareButton = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Square Outlined Buttons</h4>
          <OutlineSqrButtonCode />
        </div>
        <div className="flex gap-4 flex-wrap mt-2">
          <Button
            color="primary"
            className="border border-primary text-primary hover:bg-primary hover:text-white rounded-md"
            outline
          >
            Primary
          </Button>
          <Button
            color="secondary"
            className="border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-md"
            outline
          >
            Secondary
          </Button>
          <Button
            color="success"
            className="border border-success text-success hover:bg-success hover:text-white rounded-md"
            outline
          >
            Success
          </Button>
          <Button
            color="info"
            className="border border-info text-info hover:bg-info hover:text-white rounded-md"
            outline
          >
            Info
          </Button>
          <Button
            color="warning"
            className="border border-warning text-warning hover:bg-warning hover:text-white rounded-md"
            outline
          >
            Warning
          </Button>
          <Button
            color="error"
            className="border border-error text-error hover:bg-error hover:text-white rounded-md"
            outline
          >
            Danger
          </Button>
          <Button color="light" className="rounded-md">
            Light
          </Button>
          <Button
            color="dark"
            className="border border-dark text-dark hover:bg-dark hover:text-white rounded-md dark:text-white"
            outline
          >
            Dark
          </Button>
        </div>
      </CardBox>
    </>
  );
};

export default SquareButton;
