import React from "react";
import CodeModal from "../../CodeModal";

const LightRoundedCode = () => {
  return (
    <div>
      <CodeModal>
        {`
      import { Alert } from "flowbite-react";
      
      <Alert color="lightprimary" rounded>
        <span className="font-medium">Primary</span> - A simple Primary
        alert
      </Alert>

      <Alert color="lightsecondary" rounded>
        <span className="font-medium">Secondary</span> - A simple
        Secondary alert
      </Alert>

      <Alert color="lightsuccess" rounded>
        <span className="font-medium">Success</span> - A simple Success
        alert
      </Alert>

      <Alert color="lightinfo" rounded>
        <span className="font-medium">Info</span> - A simple Info alert
      </Alert>

      <Alert color="lightwarning" rounded>
        <span className="font-medium">Warning</span> - A simple Warning
        alert
      </Alert>

      <Alert color="lighterror" rounded>
        <span className="font-medium">Error</span> - A simple Error alert
      </Alert>

      <Alert color="lightgray" rounded>
        <span className="font-medium">Light</span> - A simple Light alert
      </Alert>
                    `}
      </CodeModal>
    </div>
  );
};

export default LightRoundedCode;
