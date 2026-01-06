import React from "react";
import CardBox from "../../shared/CardBox";
import { Button } from "flowbite-react";

const ButtonLoading = () => {
  return (
    <>
      <CardBox>
        <h4 className="text-lg font-semibold">Button with loading state</h4>
        <div className="flex flex-wrap items-start gap-2 mt-2">
          <Button color="primary" size="xs" isProcessing>
            Click me!
          </Button>
          <Button color="primary" size="sm" isProcessing pill>
            Click me!
          </Button>
          <Button color="primary" size="md" isProcessing outline>
            Click me!
          </Button>
        </div>
        <div className="flex flex-wrap items-start gap-2 mt-2">
          <Button color="secondary" size="xs" isProcessing>
            Click me!
          </Button>
          <Button color="secondary" size="sm" isProcessing pill>
            Click me!
          </Button>
          <Button color="secondary" size="md" isProcessing outline>
            Click me!
          </Button>
        </div>
      </CardBox>
    </>
  );
};

export default ButtonLoading;
