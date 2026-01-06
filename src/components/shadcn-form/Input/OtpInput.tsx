"use client";
import React from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn-ui/Default-Ui/input-otp";
import CardBox from "../../shared/CardBox";
import OtpInputCode from "./code/OtpInputCode";

const OtpInput = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">OTP Input</h4>
        <OtpInputCode/>
      </div>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </CardBox>
  );
};

export default OtpInput;
