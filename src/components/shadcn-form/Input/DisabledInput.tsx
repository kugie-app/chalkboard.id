import React from "react";
import { Input } from "@/components/shadcn-ui/Default-Ui/input";
import CardBox from "../../shared/CardBox";
import { Label } from "@/components/shadcn-ui/Default-Ui/label";
import { Button } from "../../shadcn-ui/Default-Ui/button";
import DisableInputWithButtonCode from "./code/DisableInputWithButtonCode";

const DisabledInput = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Disable Input</h4>
        <DisableInputWithButtonCode />
      </div>
      <div className="flex flex-col gap-5 mt-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input disabled type="text" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input disabled type="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input disabled type="password" />
        </div>
        <div className="flex gap-3">
          <Button disabled>Submit</Button>
          <Button disabled variant={"error"}>
            Cancel
          </Button>
        </div>
      </div>
    </CardBox>
  );
};

export default DisabledInput;
