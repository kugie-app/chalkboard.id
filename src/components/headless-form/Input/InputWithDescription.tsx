import React from "react";
import CardBox from "../../shared/CardBox";
import { Description, Field, Input, Label } from "@headlessui/react";
import InputWithDescriptionCode from "./Codes/InputWithDescriptionCode";

const InputWithDescription = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Input With Description</h4>
          <InputWithDescriptionCode/>
        </div>
        <Field className="w-full mb-3">
          <Label className="mb-1 block text-ld">Name</Label>
          <Description className="text-bodytext text-xs">
            Use your real name so people will recognize you.
          </Description>
          <Input
            type="text"
            className="ui-form-control rounded-md py-2.5 px-3 w-full mt-2"
            name="full_name"
          />
        </Field>
        <Field className="w-full mb-3">
          <Label className="mb-1 block text-ld">Email</Label>
          <Description className="text-bodytext text-xs">
            Use your real Email so people will recognize you.
          </Description>
          <Input
            type="email"
            className="ui-form-control rounded-md py-2.5 px-3 w-full mt-2"
            name="full_name"
          />
        </Field>
        <Field className="w-full ">
          <Label className="mb-1 block text-ld">Password</Label>
          <Description className="text-bodytext text-xs">
            Use your real Password so people will recognize you.
          </Description>
          <Input
            type="password"
            className="ui-form-control rounded-md py-2.5 px-3 w-full mt-2"
            name="full_name"
          />
        </Field>
      </CardBox>
    </div>
  );
};

export default InputWithDescription;
