"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import FullLogo from "@/components/layout/shared/logo/FullLogo";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import Link from "next/link";
// Second Form
const modernizFormData = {
  email: "",
  password: "",
};
interface ErrorrMessage {
  email: string;
  password: string;
}
const errorrMessage: ErrorrMessage = {
  email: "",
  password: "",
};
const InputValidationTwo = () => {
  //   Second Form

  const [modeData, setModeData] = useState(modernizFormData);
  const [errorrMessages, setErrorrMessages] = useState(errorrMessage);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setModeData({
      ...modeData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmited = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorrMessages(validation(modeData));
  };
  const validation = (formValues: any) => {
    let error: ErrorrMessage = {
      email: "",
      password: "",
    };
    console.log(formValues);
    if (!formValues.email) {
      error.email = "Email is required";
    } else {
      error.email = "";
    }
    if (!formValues.password) {
      error.password = "Password is required";
    } else if (formValues.password.length < 8) {
      error.password = "Password should be a minimum of 8 characters.";
    } else {
      error.password = "";
    }
    return error;
  };
  return (
    <div>
      <CardBox>
        <div className="pb-10 pt-3">
          <FullLogo />
        </div>
        <form onSubmit={handleSubmited}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email Address" />
              </div>
              <TextInput
                id="email"
                type="email"
                className="form-control"
                onChange={handleChanges}
                value={modeData.email}
              />
              <span className="text-red-500">{errorrMessages.email}</span>
            </div>
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                className="form-control"
                onChange={handleChanges}
                value={modeData.password}
              />
              <span className="text-red-500">{errorrMessages.password}</span>
            </div>
            <div className="flex items-center gap-2 lg:col-span-6 col-span-12">
              <Checkbox className="checkbox" id="remember" />
              <Label htmlFor="remember">Remember this Device</Label>
            </div>
            <div className="lg:col-span-6 col-span-12 text-end">
              <Link href="/" className="text-primary">
                Forgot Password ?
              </Link>
            </div>
            <div className="col-span-12 flex items-center gap-[1rem]">
              <Button type="submit" color="primary">
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </CardBox>
    </div>
  );
};

export default InputValidationTwo;
