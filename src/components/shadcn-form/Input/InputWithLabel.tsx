import React from "react";
import { Input } from "@/components/shadcn-ui/Default-Ui/input";
import CardBox from "../../shared/CardBox";
import { Label } from "@/components/shadcn-ui/Default-Ui/label";
import InputLabelCode from "./code/InputLabelCode";
const InputWithLabel = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Input With Label</h4>
        <InputLabelCode />
      </div>
      <div className="flex flex-col gap-5 mt-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" />
        </div>
      </div>
    </CardBox>
  );
};

export default InputWithLabel;
