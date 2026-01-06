import { Alert, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { HiInformationCircle, HiEye } from "react-icons/hi";
import AdditionalAlertCode from "./Code/AdditionalAlertCode";
const Additional = () => {
  function ExampleAdditionalContent() {
    return (
      <>
        <div className="mb-4 mt-2 text-sm text-cyan-700 dark:text-cyan-800">
          More info about this info alert goes here. This example text is going
          to run a bit longer so that you can see how spacing within an alert
          works with this kind of content.
        </div>
        <div className="flex gap-3">
          <Button
            color={"primary"}
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
          <h4 className="text-lg font-semibold">Additional Content</h4>
          <AdditionalAlertCode />
        </div>
        <Alert
          additionalContent={<ExampleAdditionalContent />}
          color="lightprimary"
          icon={HiInformationCircle}
          className="rounded-md"
        >
          <span className="font-medium">Info alert!</span> Change a few things
          up and try submitting again.
        </Alert>
      </CardBox>
    </div>
  );
};

export default Additional;
