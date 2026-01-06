import { Alert } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import LightAlertIconCode from "./Code/LightAlertIconCode";
import { HiInformationCircle } from "react-icons/hi";
const LightAlertWithIcon = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Light Alert With Icon</h4>
          <LightAlertIconCode />
        </div>
        <Alert
          color="lightprimary"
          icon={HiInformationCircle}
          className="rounded-md"
        >
          <span className="font-medium">Primary</span> - A simple Primary alert
        </Alert>

        <Alert
          color="lightsecondary"
          icon={HiInformationCircle}
          className="rounded-md"
        >
          <span className="font-medium">Secondary</span> - A simple Secondary
          alert
        </Alert>

        <Alert
          color="lightsuccess"
          icon={HiInformationCircle}
          className="rounded-md"
        >
          <span className="font-medium">Success</span> - A simple Success alert
        </Alert>

        <Alert
          color="lightinfo"
          icon={HiInformationCircle}
          className="rounded-md"
        >
          <span className="font-medium">Info</span> - A simple Info alert
        </Alert>

        <Alert
          color="lightwarning"
          icon={HiInformationCircle}
          className="rounded-md"
        >
          <span className="font-medium">Warning</span> - A simple Warning alert
        </Alert>

        <Alert
          color="lighterror"
          icon={HiInformationCircle}
          className="rounded-md"
        >
          <span className="font-medium">Error</span> - A simple Error alert
        </Alert>

        <Alert color="lightgray" icon={HiInformationCircle} className="rounded-md">
          <span className="font-medium">Light</span> A simple Light alert
        </Alert>
      </CardBox>
    </div>
  );
};

export default LightAlertWithIcon;
