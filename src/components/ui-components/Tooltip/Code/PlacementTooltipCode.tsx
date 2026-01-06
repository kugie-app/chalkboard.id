import React from "react";
import CodeModal from "../../CodeModal";

const PlacementTooltipCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Button, Tooltip } from "flowbite-react";
    
    <Tooltip content="Tooltip content" placement="top">
      <Button color={"primary"}>
        Tooltip top
      </Button>
    </Tooltip>
    <Tooltip content="Tooltip content" placement="right">
      <Button color="secondary">
        Tooltip right
      </Button>
    </Tooltip>
    <Tooltip content="Tooltip content" placement="bottom">
      <Button color="info">
        Tooltip bottom
      </Button>
    </Tooltip>
    <Tooltip content="Tooltip content" placement="left">
      <Button color="success">
        Tooltip left
      </Button>
    </Tooltip>
                `}
      </CodeModal>
    </div>
  );
};

export default PlacementTooltipCode;
