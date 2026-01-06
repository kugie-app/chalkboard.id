import { Alert } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import LightBorderAcccentCode from "./Code/LightBorderAcccentCode";

const LightBorderAccent = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Light Border Accent</h4>
          <LightBorderAcccentCode />
        </div>
        <Alert color="lightprimary" withBorderAccent>
          <span>
            <span className="font-medium">Primary</span> - A simple Primary
            alert
          </span>
        </Alert>

        <Alert color="lightsecondary" withBorderAccent>
          <span>
            <span className="font-medium">Secondary</span> - A simple Secondary
            alert
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
            <span className="font-medium">Error</span> - A simple Error alert
          </span>
        </Alert>
      </CardBox>
    </div>
  );
};

export default LightBorderAccent;
