"use client";
import { Label, TextInput, Button } from "flowbite-react";
import React, { useState } from "react";
import TitleCard from "../../shared/TitleBorderCard";
// Third Form
const onleaveFormData = {
  email: "",
  password: "",
};
interface ErrorsMessage {
  email: string;
  password: string;
}
const errorsMessage: ErrorsMessage = {
  email: "",
  password: "",
};
const OnLeaveValidation = () => {
  //   Third Form
  const [onleaveData, setOnleaveData] = useState(onleaveFormData);
  const [errorsMessages, setErrorsMessages] = useState(errorsMessage);

  const handlesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOnleaveData({
      ...onleaveData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setErrorsMessages(validations(onleaveData));
  };

  const handlesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorsMessages(validations(onleaveData));
  };

  //   Third Validate
  const validations = (formValues: any) => {
    let error: ErrorsMessage = {
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
      <TitleCard title="On Leave">
        <form onSubmit={handlesSubmit}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email Address" />
              </div>
              <TextInput
                id="email"
                type="email"
                className="form-control"
                onChange={handlesChange}
                onBlur={handlesBlur}
                value={onleaveData.email}
              />
              <span className="text-red-500">{errorsMessages.email}</span>
            </div>
            <div className="col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                className="form-control"
                onChange={handlesChange}
                onBlur={handlesBlur}
                value={onleaveData.email}
              />
              <span className="text-red-500">{errorsMessages.password}</span>
            </div>
            <div className="col-span-12 flex items-center gap-[1rem] justify-end">
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </TitleCard>
    </div>
  );
};

export default OnLeaveValidation;
