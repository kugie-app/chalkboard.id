import { Label, TextInput } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const FormValidation = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Form validation</h4>
        <div className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username3" color="success" value="Your name" />
            </div>
            <TextInput
              id="username"
              placeholder="Bonnie Green"
              required
              color="success"
              className="form-control-validation"
              helperText={
                <>
                  <span className="font-medium">Alright!</span> Username
                  available!
                </>
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username4" color="failure" value="Your name" />
            </div>
            <TextInput
              id="username4"
              placeholder="Bonnie Green"
              required

              className="form-control-validation"
              color="failure"
              helperText={
                <>
                  <span className="font-medium">Oops!</span> Username already
                  taken!
                </>
              }
            />
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default FormValidation;
