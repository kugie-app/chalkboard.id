import { Spinner } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const AlignSpinner = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Alignment</h4>
          <CodeModal>
            {`
    import { Spinner } from "flowbite-react";
    
    <div>
        <div className="text-left">
        <Spinner aria-label="Left-aligned spinner example" />
        </div>
        <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
        </div>
        <div className="text-right">
        <Spinner aria-label="Right-aligned spinner example" />
        </div>
    </div>
              `}
          </CodeModal>
        </div>
        <div>
          <div className="text-left">
            <Spinner aria-label="Left-aligned spinner example" />
          </div>
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
          <div className="text-right">
            <Spinner aria-label="Right-aligned spinner example" />
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default AlignSpinner;
