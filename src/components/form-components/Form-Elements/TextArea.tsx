import React from "react";
import CardBox from "../../shared/CardBox";
import { Label, Textarea } from "flowbite-react";

const TextAreaEle = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Textarea element</h4>
        <div className="max-w-md ">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Your message" />
          </div>
          <Textarea
            id="comment"
            placeholder="Leave a comment..."
            required
            rows={8}
            className="form-control-textarea rounded-md"
          />
        </div>
      </CardBox>
    </div>
  );
};

export default TextAreaEle;
