import React from "react";
import { Textarea } from "@/components/shadcn-ui/Default-Ui/textarea";
import CardBox from "../../shared/CardBox";
import { Label } from "../../shadcn-ui/Default-Ui/label";

const TextareaWithText = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">Textarea with Label</h4>
      </div>
      <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-bodytext">
        Your message will be copied to the support team.
      </p>
    </div>
    </CardBox>
  );
};

export default TextareaWithText;
