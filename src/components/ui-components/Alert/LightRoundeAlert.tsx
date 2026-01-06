import React from "react";
import LightRoundedCode from "./Code/LightRoundedCode";
import { Alert } from "flowbite-react";
import CardBox from "../../shared/CardBox";

const LightRoundeAlert = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Light Rounded Alert</h4>
          <LightRoundedCode />
        </div>
        <Alert color="lightprimary" rounded>
          <span className="font-medium">Primary</span> - A simple Primary alert
        </Alert>

        <Alert color="lightsecondary" rounded>
          <span className="font-medium">Secondary</span> - A simple Secondary
          alert
        </Alert>

        <Alert color="lightsuccess" rounded>
          <span className="font-medium">Success</span> - A simple Success alert
        </Alert>

        <Alert color="lightinfo" rounded>
          <span className="font-medium">Info</span> - A simple Info alert
        </Alert>

        <Alert color="lightwarning" rounded>
          <span className="font-medium">Warning</span> - A simple Warning alert
        </Alert>

        <Alert color="lighterror" rounded>
          <span className="font-medium">Error</span> - A simple Error alert
        </Alert>

        <Alert color="lightgray" rounded>
          <span className="font-medium">Light</span> - A simple Light alert
        </Alert>
      </CardBox>
    </div>
  );
};

export default LightRoundeAlert;
