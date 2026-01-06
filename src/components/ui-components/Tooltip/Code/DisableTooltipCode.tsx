import React from "react";
import CodeModal from "../../CodeModal";

const DisableTooltipCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Button, Tooltip } from "flowbite-react";
    
    <Tooltip content="Tooltip content" arrow={false}>
      <Button color="info">Default tooltip</Button>
    </Tooltip>
                `}
      </CodeModal>
    </div>
  );
};

export default DisableTooltipCode;
