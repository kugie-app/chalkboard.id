import React from "react";
import CodeModal from "../../CodeModal";

const LightButtonCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Button } from "flowbite-react";

    <div className="flex flex-wrap gap-2 mt-2">
      <Button color="lightprimary">Primary</Button>
      <Button color="lightsecondary">Secondary</Button>
      <Button color="lightsuccess">Success</Button>
      <Button color="lightinfo">Info</Button>
      <Button color="lightwarning">Warning</Button>
      <Button color="lighterror">Danger</Button>
    </div>    
      `}
      </CodeModal>
    </>
  );
};

export default LightButtonCode;
