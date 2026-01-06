import React from "react";
import CodeModal from "../../CodeModal";

const DefautBadgeCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Badge } from "flowbite-react";

    <div className="flex flex-wrap gap-2">
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Danger</Badge>
    </div>    
      `}
      </CodeModal>
    </>
  );
};

export default DefautBadgeCode;
