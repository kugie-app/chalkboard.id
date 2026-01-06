import React from "react";
import { Description, Field, Label, Textarea } from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";
const WithDescriptionTextarea = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Discription With Textarea</h4>
          <CodeModal>
            {`
    import { Description, Field, Label, Textarea } from "@headlessui/react";

   <Field>
        <Label className="text-ld mb-1 block font-medium">Type Here</Label>
        <Description className="text-bodytext text-xs mb-2">
        Add any extra information about your event here.
        </Description>
        <Textarea
        name="description"
        className="ui-form-control rounded-md"
        rows={6}
        ></Textarea>
    </Field>
            `}
          </CodeModal>
        </div>
        <Field>
          <Label className="text-ld mb-1 block font-medium">Type Here</Label>
          <Description className="text-bodytext text-xs mb-2">
            Add any extra information about your event here.
          </Description>
          <Textarea
            name="description"
            className="ui-form-control rounded-md"
            rows={6}
          ></Textarea>
        </Field>
      </CardBox>
    </div>
  );
};

export default WithDescriptionTextarea;
