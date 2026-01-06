import React from "react";
import CodeModal from "../../CodeModal";

const OutlineSqrButtonCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Button } from "flowbite-react";

    <div className="flex flex-wrap gap-2 mt-2">
        <Button
        color="primary"
        className="border border-primary text-primary hover:bg-primary hover:text-white rounded-md"
        pill
        outline
        >
        Primary
        </Button>
        <Button
        color="secondary"
        className="border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-md"
        pill
        outline
        >
        Secondary
        </Button>
        <Button
        color="success"
        className="border border-success text-success hover:bg-success hover:text-white rounded-md"
        pill
        outline
        >
        Success
        </Button>
        <Button
        color="info"
        className="border border-info text-info hover:bg-info hover:text-white rounded-md"
        pill
        outline
        >
        Info
        </Button>
        <Button
        color="warning"
        className="border border-warning text-warning hover:bg-warning hover:text-white rounded-md"
        pill
        outline
        >
        Warning
        </Button>
        <Button
        color="error"
        className="border border-error text-error hover:bg-error hover:text-white rounded-md"
        pill
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
        pill
        outline
        >
        Dark
        </Button>
    </div>    
      `}
      </CodeModal>
    </>
  );
};

export default OutlineSqrButtonCode;
