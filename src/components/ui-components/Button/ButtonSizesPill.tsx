import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";

const ButtonSizesPill = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold ">Button Pill Sizes</h4>
        </div>
        <div className="flex flex-wrap items-start gap-2 mt-2">
          <Button size="xs" color={"primary"} >
            Extra small
          </Button>
          <Button size="sm" color={"secondary"} >
            Small
          </Button>
          <Button size="md" color={"error"} >
            Base
          </Button>
          <Button size="lg" color={"info"} >
            Large
          </Button>
          <Button size="xl" color={"warning"} >
            Extra large
          </Button>
        </div>
      </CardBox>
    </>
  );
};

export default ButtonSizesPill;
