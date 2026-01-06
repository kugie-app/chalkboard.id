import React from "react";
import CodeModal from "../../CodeModal";

const SizesCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Badge } from "flowbite-react";

    <div className="flex flex-wrap gap-2 mt-2">
        <Badge color="primary" size="xs">
        Primary
        </Badge>
        <Badge color="secondary" size="xs">
        Secondary
        </Badge>
        <Badge color="success" size="xs">
        Success
        </Badge>
        <Badge color="info" size="xs">
        Info
        </Badge>
    </div>
    <div className="flex flex-wrap gap-2 mt-1">
        <Badge color="primary" size="sm">
        Primary
        </Badge>
        <Badge color="secondary" size="sm">
        Secondary
        </Badge>
        <Badge color="success" size="sm">
        Success
        </Badge>
        <Badge color="info" size="sm">
        Info
        </Badge>
    </div>
      `}
      </CodeModal>
    </>
  );
};

export default SizesCode;
