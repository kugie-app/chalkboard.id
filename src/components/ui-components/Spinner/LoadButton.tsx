import { Button, Spinner } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const LoadButton = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Loading buttons</h4>
          <CodeModal>
            {`
    import { Button, Spinner } from "flowbite-react";
    
    <div className="flex flex-row gap-3">
      <Button color="primary">
        <Spinner aria-label="Spinner button example" size="sm" />
        <span className="pl-3">Loading...</span>
      </Button>
      <Button color="gray">
        <Spinner
          aria-label="Alternate spinner button example"
          size="sm"
        />
        <span className="pl-3">Loading...</span>
      </Button>
    </div>
              `}
          </CodeModal>
        </div>
        <div className="flex flex-row gap-3 py-3">
          <Button color="primary">
            <Spinner aria-label="Spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
          <Button color="gray">
            <Spinner aria-label="Alternate spinner button example" size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
        </div>
      </CardBox>
    </div>
  );
};

export default LoadButton;
