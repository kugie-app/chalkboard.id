import { Label, TextInput } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const DisableInputs = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Disabled inputs</h4>
        <div className="flex max-w-md flex-col gap-4 pb-20">
          <Label htmlFor="disabledInput1">API token</Label>
          <TextInput
            type="text"
            id="disabledInput1"
            placeholder="Disabled input"
            disabled className="form-control"
          />
          <Label htmlFor="disabledInput2">Personal access token</Label>
          <TextInput
            type="text"
            id="disabledInput2"
            placeholder="Disabled readonly input"
            disabled className="form-control"
            readOnly
          />
        </div>
      </CardBox>
    </div>
  );
};

export default DisableInputs;
