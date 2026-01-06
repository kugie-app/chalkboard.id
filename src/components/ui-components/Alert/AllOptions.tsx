"use client";
import { Alert, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import AllOptionscode from "./Code/AllOptionscode";
import { HiInformationCircle, HiEye } from "react-icons/hi";
const AllOptions = () => {
  function ExampleAdditionalContent() {
    return (
      <>
        <div className="mb-4 mt-2 text-success">
          More info about this info alert goes here. This example text is going
          to run a bit longer so that you can see how spacing within an alert
          works with this kind of content.
        </div>
        <div className="flex gap-3">
          <Button
            color={"success"}
            className="flex gap-2 items-center"
            size={"sm"}
          >
            <HiEye size={15} />
            View more
          </Button>
          <Button
            color={"error"}
            className="flex gap-2 items-center"
            size={"sm"}
          >
            Dismiss
          </Button>
        </div>
      </>
    );
  }

  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">All Options</h4>
          <AllOptionscode />
        </div>
        <Alert
          additionalContent={<ExampleAdditionalContent />}
          color="lightsuccess"
          icon={HiInformationCircle}
          onDismiss={() => alert("Alert dismissed!")}
          rounded
          className="rounded-md"
        >
          <span className="font-medium">Info alert!</span> Change a few things
          up and try submitting again.
        </Alert>
      </CardBox>
    </div>
  );
};

export default AllOptions;
