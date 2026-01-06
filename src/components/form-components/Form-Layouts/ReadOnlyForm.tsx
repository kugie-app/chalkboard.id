import { Label, TextInput, Button } from "flowbite-react";
import React from "react";
import TitleCard from "../../shared/TitleBorderCard";

const ReadOnlyForm = () => {
  return (
    <div>
      <TitleCard title="Readonly Form">
        <div className="grid grid-cols-4 gap-30">
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              value={"Wrappixel"}
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="emailid" value="Email" />
            </div>
            <TextInput
              id="emailid"
              type="email"
              value={"info@wrappixel.com"}
              required
              className="form-control"
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
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              value={"info@wrappixel.com"}
              className="form-control"
              required
            />
          </div>
          <div className="col-span-12">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default ReadOnlyForm;
