import React from "react";
import CodeModal from "../../CodeModal";

const LightBadgeCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Badge } from "flowbite-react";
    
    <div className="flex flex-wrap gap-2">
      <Badge color="lightprimary">Primary</Badge>
      <Badge color="lightsecondary">Secondary</Badge>
      <Badge color="lightsuccess">Success</Badge>
      <Badge color="lightinfo">Info</Badge>
      <Badge color="lightwarning">Warning</Badge>
      <Badge color="lighterror">Danger</Badge>
    </div>  
      `}
      </CodeModal>
    </>
  );
};

export default LightBadgeCode;
