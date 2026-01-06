import { Kbd } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const InsideText = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">KBD Inside Text</h4>
          <CodeModal>
            {`
  import { Kbd } from "flowbite-react";
  
  <div className="pt-2">
    Please press <Kbd className="rounded-md">Ctrl</Kbd> +{" "}
    <Kbd className="rounded-md">Shift</Kbd> +{" "}
    <Kbd className="rounded-md">R</Kbd> to re-render an MDN page.
  </div>
                `}
          </CodeModal>
        </div>

        <div className="pt-2">
          Please press <Kbd className="rounded-md">Ctrl</Kbd> +{" "}
          <Kbd className="rounded-md">Shift</Kbd> +{" "}
          <Kbd className="rounded-md">R</Kbd> to re-render an MDN page.
        </div>
      </CardBox>
    </div>
  );
};

export default InsideText;
