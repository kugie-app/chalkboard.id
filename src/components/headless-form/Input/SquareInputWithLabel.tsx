import React from "react";
import CardBox from "../../shared/CardBox";
import { Field, Input, Label } from "@headlessui/react";
import SquareInputsCodes from "../../form-components/Form-Elements/Codes/SquareInputs";
const SquareInputWithLabel = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Square Input With Label</h4>
          <SquareInputsCodes />
        </div>
        <Field className="w-full mb-3">
          <Label className="mb-2 block text-ld">Name</Label>
          <Input
            type="text"
            className="ui-form-control rounded-md py-2.5 px-3 w-full"
            name="full_name"
          />
        </Field>
        <Field className="w-full mb-3">
          <Label className="mb-2 block text-ld">Email</Label>
          <Input
            type="email"
            className="ui-form-control rounded-md py-2.5 px-3 w-full"
            name="full_name"
          />
        </Field>
        <Field className="w-full ">
          <Label className="mb-2 block text-ld">Password</Label>
          <Input
            type="password"
            className="ui-form-control rounded-md py-2.5 px-3 w-full"
            name="full_name"
          />
        </Field>
      </CardBox>
    </div>
  );
};

export default SquareInputWithLabel;
