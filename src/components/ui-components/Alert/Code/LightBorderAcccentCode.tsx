import React from "react";
import CodeModal from "../../CodeModal";

const LightBorderAcccentCode = () => {
  return (
    <div>
      <CodeModal>
        {`
      import { Alert } from "flowbite-react";
      
      <Alert color="lightprimary" withBorderAccent>
        <span>
          <span className="font-medium">Primary</span> - A simple Primary
          alert
        </span>
      </Alert>

      <Alert color="lightsecondary" withBorderAccent>
        <span>
          <span className="font-medium">Secondary</span> - A simple
          Secondary alert
        </span>
      </Alert>

      <Alert color="lightsuccess" withBorderAccent>
        <span>
          <span className="font-medium">Success</span> - A simple Success
          alert
        </span>
      </Alert>

      <Alert color="lightinfo" withBorderAccent>
        <span>
          <span className="font-medium">Info</span> - A simple Info alert
        </span>
      </Alert>

      <Alert color="lightwarning" withBorderAccent>
        <span>
          <span className="font-medium">Warning</span> - A simple Warning
          alert
        </span>
      </Alert>

      <Alert color="lighterror" withBorderAccent>
        <span>
          <span className="font-medium">Error</span> - A simple Error
          alert
        </span>
      </Alert>
                `}
      </CodeModal>
    </div>
  );
};

export default LightBorderAcccentCode;
