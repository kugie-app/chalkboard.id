import React from "react";
import CodeModal from "../../../ui-components/CodeModal";
const RoundInputsCodes = () => {
  return (
    <>
      <CodeModal>
        {`  
      import {Button,Label,TextInput,Checkbox } from "flowbite-react";

      <form className="flex max-w-md flex-col gap-4">
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
  
                `}
      </CodeModal>
    </>
  );
};

export default RoundInputsCodes;
