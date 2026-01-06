import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import CardBox from "../../shared/CardBox";

const InputShadow = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Inputs With Shadow</h4>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="name@matdash.com"
              required
              shadow className="form-control"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput id="password2" type="password" required shadow className="form-control" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="Repeat password" />
            </div>
            <TextInput id="repeat-password" type="password" required shadow className="form-control" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" className="checkbox" />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link
                href="#"
                className="text-priamry hover:underline dark:text-primary"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button type="submit" color="primary">
            Register new account
          </Button>
        </form>
      </CardBox>
    </div>
  );
};

export default InputShadow;
