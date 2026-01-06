import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const LightButtonsCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import React from "react";
    import { Button } from "@headlessui/react";

    <div className="flex gap-3 flex-wrap">
          <Button className="ui-button bg-lightprimary text-primary hover:bg-primary hover:text-white">Primary</Button>
          <Button className="ui-button bg-lightsecondary text-secondary hover:bg-secondary hover:text-white">Secondary</Button>
          <Button className="ui-button bg-lightsuccess text-success hover:bg-success hover:text-white">Success</Button>
          <Button className="ui-button bg-lighterror text-error hover:bg-error hover:text-white">Error</Button>
          <Button className="ui-button bg-lightwarning text-warning hover:bg-warning hover:text-white">Warning</Button>
          <Button className="ui-button bg-lightinfo text-info hover:bg-info hover:text-white">Info</Button>
    </div>
        `}
      </CodeModal>
    </div>
  );
};

export default LightButtonsCode;
