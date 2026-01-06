import React from 'react'
import CodeModal from '@/components/shadcn-ui/CodeModal'


const OtpInputCode = () => {
  return (
    <>
      <CodeModal>
        {`  
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn-ui/Default-Ui/input-otp";

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
    <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
    </InputOTPGroup>
</InputOTP>
                `}
      </CodeModal>
    </>
  )
}

export default OtpInputCode