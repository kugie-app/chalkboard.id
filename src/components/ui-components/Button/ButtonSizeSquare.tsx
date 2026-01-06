import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";

const ButtonSizesSquare = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold ">Button Square Sizes</h4>
        </div>
        <div className="flex flex-wrap items-start gap-2 mt-2">
          <Button size="xs" color={"primary"} className="rounded-md" >
            Extra small
          </Button>
          <Button size="sm" color={"secondary"} className="rounded-md">
            Small
          </Button>
          <Button size="md" color={"error"} className="rounded-md">
            Base
          </Button>
          <Button size="lg" color={"info"} className="rounded-md">
            Large
          </Button>
          <Button size="xl" color={"warning"} className="rounded-md">
            Extra large
          </Button>
        </div>
      </CardBox>
    </>
  );
};

export default ButtonSizesSquare;
