"use client";
import FullLogo from "@/components/layout/shared/logo/FullLogo";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
// First Form
const initialFormData = {
  name: "",
  email: "",
  password: "",
};
interface ErrorMessage {
  name: string;
  email: string;
  password: string;
}
const errorMessage: ErrorMessage = {
  name: "",
  email: "",
  password: "",
};

const InputValidationOne = () => {
  // First Form
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState(errorMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages(validate(formData));
  };

  const validate = (formValues: any) => {
    let error: ErrorMessage = {
      name: "",
      email: "",
      password: "",
    };
    console.log(formValues);
    if (!formValues.first) {
      error.name = "Firstname is required";
    } else if (formValues.first.length < 10) {
      error.name = "Firstname should be minimum 10 characters.";
    } else {
      error.name = "";
    }
    if (!formValues.last) {
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                className="form-control"
                onChange={handleChange}
                value={formData.name}
              />
              <span className="text-red-500">{errorMessages.name}</span>
            </div>
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                className="form-control"
                onChange={handleChange}
                value={formData.email}
              />
              <span className="text-red-500">{errorMessages.email}</span>
            </div>
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                className="form-control"
                onChange={handleChange}
                value={formData.password}
              />
              <span className="text-red-500">{errorMessages.password}</span>
            </div>
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="confirmpassword" value="Confirm Password" />
              </div>
              <TextInput
                id="confirmpassword"
                type="confirmpassword"
                className="form-control"
              />
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

export default InputValidationOne;
