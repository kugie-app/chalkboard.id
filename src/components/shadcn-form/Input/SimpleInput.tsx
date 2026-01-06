import React from "react";
import { Input } from "@/components/shadcn-ui/Default-Ui/input";
import CardBox from "../../shared/CardBox";
import SimpleInputcode from "./code/SimpleInputCode";
const SimpleInput = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">General Input</h4>
        <SimpleInputcode/>
      </div>
      <div className="flex flex-col gap-5 mt-4">
        <Input type="text" placeholder="Name" />
        <Input type="text" placeholder="Comapny" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </div>
    </CardBox>
  );
};

export default SimpleInput;
