"use client";
import { Alert } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import LightDissmisableCode from "./Code/LightDissmisableCode";

const LightDismissibleAlert = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Light Dismissible Alert</h4>
          <LightDissmisableCode />
        </div>
        <Alert
          color="lightprimary"
          onDismiss={() => alert("Alert dismissed!")}
          className="rounded-md"
        >
          <span className="font-medium">Primary</span> - A simple Primary alert
        </Alert>

        <Alert
          color="lightsecondary"
          onDismiss={() => alert("Alert dismissed!")}
          className="rounded-md"
        >
          <span className="font-medium">Secondary</span> - A simple Secondary
          alert
        </Alert>

        <Alert
          color="lightsuccess"
          onDismiss={() => alert("Alert dismissed!")}
          className="rounded-md"
        >
          <span className="font-medium">Success</span> - A simple Success alert
        </Alert>

        <Alert
          color="lightinfo"
          onDismiss={() => alert("Alert dismissed!")}
          className="rounded-md"
        >
          <span className="font-medium">Info</span> - A simple Info alert
        </Alert>

        <Alert
          color="lightwarning"
          onDismiss={() => alert("Alert dismissed!")}
          className="rounded-md"
        >
          <span className="font-medium">Warning</span> - A simple Warning alert
        </Alert>

        <Alert
          color="lighterror"
          onDismiss={() => alert("Alert dismissed!")}
          className="rounded-md"
        >
          <span className="font-medium">Error</span> - A simple Error alert
        </Alert>

        <Alert
          color="lightgray"
          onDismiss={() => alert("Alert dismissed!")}
          className="rounded-md"
        >
          <span className="font-medium">Dark</span> - A simple Dark alert
        </Alert>
      </CardBox>
    </div>
  );
};

export default LightDismissibleAlert;
