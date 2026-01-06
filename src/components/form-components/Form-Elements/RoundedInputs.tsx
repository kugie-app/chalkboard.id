import React from "react";
import CardBox from "../../shared/CardBox";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import RoundInputsCodes from "./Codes/RoundedInputs";

const RoundedInputs = () => {
  return (
    <div>
      <CardBox>
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold mb-2">Rounded Inputs form</h4>
          <RoundInputsCodes />
        </div>

        <form className="flex  flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@matdash.com"
              required
              className="form-control-rounded"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              className="form-control-rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox className="checkbox" id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </form>
      </CardBox>
    </div>
  );
};

export default RoundedInputs;
