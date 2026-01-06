import React from "react";
import CodeModal from "../../CodeModal";

const TooltipTriggerCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Button, Tooltip } from "flowbite-react";
    
    <div className="flex gap-2 mt-2">
      <Tooltip content="Tooltip content" trigger="hover">
        <Button color="primary">
          Tooltip hover
        </Button>
      </Tooltip>
      <Tooltip content="Tooltip content" trigger="click">
        <Button color="secondary">
          Tooltip click
        </Button>
      </Tooltip>
    </div>
                `}
      </CodeModal>
    </div>
  );
};

export default TooltipTriggerCode;
