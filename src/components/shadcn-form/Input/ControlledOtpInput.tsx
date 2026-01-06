"use client";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/shadcn-ui/Default-Ui/input-otp";
import CardBox from "../../shared/CardBox";

const ControlledOtpInput = () => {
  const [value, setValue] = React.useState("");
  return (
    <CardBox>
      <div className="flex items-center justify-between ">
        <h4 className="text-lg font-semibold">Controlled OTP Input</h4>
      </div>
      <div className="space-y-2">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className=" text-sm text-ld">
          {value === "" ? (
            <>Enter your one-time password.</>
          ) : (
            <>You entered: {value}</>
          )}
        </div>
      </div>
    </CardBox>
  );
};

export default ControlledOtpInput;
