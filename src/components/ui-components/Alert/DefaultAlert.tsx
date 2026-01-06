import { Alert } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import DefaultAlertCode from "./Code/DefaultAlertCode";

const DefaultAlert = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default Alert</h4>
          <DefaultAlertCode/>
        </div>
        <Alert color="primary" className="rounded-md">
          <span className="font-medium">Primary</span> - A simple primary alert
        </Alert>

        <Alert color="secondary" className="rounded-md">
          <span className="font-medium">Secondary</span> A simple Secondary
          alert
        </Alert>

        <Alert color="success" className="rounded-md">
          <span className="font-medium">Success</span> A simple Success alert
        </Alert>

        <Alert color="info" className="rounded-md">
          <span className="font-medium">Info</span> A simple Info alert
        </Alert>

        <Alert color="warning" className="rounded-md">
          <span className="font-medium">Warning</span> A simple Warning alert
        </Alert>

        <Alert color="error" className="rounded-md">
          <span className="font-medium">Error</span> A simple Error alert
        </Alert>

        <Alert color="dark" className="rounded-md">
          <span className="font-medium">Dark</span> A simple Dark alert
        </Alert>
      </CardBox>
    </div>
  );
};

export default DefaultAlert;
