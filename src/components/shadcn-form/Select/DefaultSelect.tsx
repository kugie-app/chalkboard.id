import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn-ui/Default-Ui/select";
import CardBox from "../../shared/CardBox";
import DefaultSelectCode from "./code/DefaultSelectCode";
const DefaultSelect = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">Default</h4>
        <DefaultSelectCode />
      </div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </CardBox>
  );
};

export default DefaultSelect;
