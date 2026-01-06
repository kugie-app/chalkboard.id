import { Label, TextInput, Button } from "flowbite-react";
import React from "react";
import TitleCard from "../../shared/TitleBorderCard";

const DisableForm = () => {
  return (
    <div>
      <TitleCard title="Disabled Form">
        <div className="grid grid-cols-4 gap-30">
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="disabledInput1" value="Name" />
            </div>
            <TextInput
              id="disabledInput1"
              type="text"
              sizing="md"
              className="form-control"
              disabled
            />
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="disabledInput1" value="Email" />
            </div>
            <TextInput
              id="disabledInput1"
              type="email"
              required
              className="form-control"
              disabled
              helperText={
                <>
                  We’ll never share your details. Read our
                  <a
                    href="#"
                    className="ml-1 font-medium text-primary hover:underline dark:text-primary"
                  >
                    Privacy Policy
                  </a>
                  .
                </>
              }
            />
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="disabledInput1" value="Password" />
            </div>
            <TextInput
              id="disabledInput1"
              type="password"
              className="form-control"
              disabled
            />
          </div>
          <div className="col-span-12">
            <Button type="submit" color="primary" disabled>
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default DisableForm;
