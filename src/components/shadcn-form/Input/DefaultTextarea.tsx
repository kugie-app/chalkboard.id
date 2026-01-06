import React from "react";
import { Textarea } from "@/components/shadcn-ui/Default-Ui/textarea";
import CardBox from "../../shared/CardBox";
import DafaultTextareacode from "./code/DafaultTextareacode";

const DefaultTextarea = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold">Default Textarea</h4>
        <DafaultTextareacode/>
      </div>
      <Textarea placeholder="Type your message here." className="h-[130px]" />
    </CardBox>
  );
};

export default DefaultTextarea;
