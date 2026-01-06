import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";
import { Spinner } from "flowbite-react";

const SizingSpinner = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Sizing Options</h4>
          <CodeModal>
            {`
    import { Spinner } from "flowbite-react";
    
    <div className="flex flex-wrap gap-3">
        <Spinner aria-label="Extra small spinner example" size="xs" />
        <Spinner aria-label="Small spinner example" size="sm" />
        <Spinner aria-label="Medium sized spinner example" size="md" />
        <Spinner aria-label="Large spinner example" size="lg" />
        <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
              `}
          </CodeModal>
        </div>

        <div className="flex flex-wrap gap-3">
          <Spinner aria-label="Extra small spinner example" size="xs" />
          <Spinner aria-label="Small spinner example" size="sm" />
          <Spinner aria-label="Medium sized spinner example" size="md" />
          <Spinner aria-label="Large spinner example" size="lg" />
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      </CardBox>
    </div>
  );
};

export default SizingSpinner;
