import React from "react";
import CodeModal from "../../CodeModal";

const TooltipStyleCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Button, Tooltip } from "flowbite-react";

    <div className="flex gap-2 mt-2">
      <Tooltip content="Tooltip content" style="light">
        <Button color="primary">
          Light tooltip
        </Button>
      </Tooltip>
      <Tooltip content="Tooltip content" style="dark">
        <Button color="secondary">
          Dark tooltip
        </Button>
      </Tooltip>
    </div>
        `}
      </CodeModal>
    </div>
  );
};

export default TooltipStyleCode;
