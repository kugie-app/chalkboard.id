import React from "react";
import { Input } from "@/components/shadcn-ui/Default-Ui/input";
import CardBox from "../../shared/CardBox";
import { Label } from "@/components/shadcn-ui/Default-Ui/label";
import { Button } from "../../shadcn-ui/Default-Ui/button";
import InputWithButtonCode from "./code/InputWithButtonCode";

const Forminput = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Input With Button</h4>
        <InputWithButtonCode/>
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
        <div className="flex gap-3">
          <Button>Submit</Button>
          <Button variant={"error"}>Cancel</Button>
        </div>
      </div>
    </CardBox>
  );
};

export default Forminput;
