import { Label, TextInput } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const FormHelperText = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Form Helper Text</h4>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="email3" value="Your email" />
          </div>
          <TextInput
            id="email3"
            type="email"
            placeholder="name@matdash.com"
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
      </CardBox>
    </div>
  );
};

export default FormHelperText;
