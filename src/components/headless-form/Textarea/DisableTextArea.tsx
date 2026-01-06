import React from "react";
import { Description, Field, Label, Textarea } from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";
const DisableTextarea = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Disabled Textarea</h4>
          <CodeModal>
            {`
    import { Description, Field, Label, Textarea } from "@headlessui/react";

    <Field disabled>
        <Label className="text-ld mb-1 block font-medium data-[disabled]:opacity-50">
        Type Here
        </Label>
        <Description className="text-bodytext text-xs mb-2 data-[disabled]:opacity-50">
        Add any extra information about your event here.
        </Description>
        <Textarea
        name="description"
        className="ui-form-control rounded-md data-[disabled]:bg-gray-100"
        rows={6}
        ></Textarea>
    </Field>
            `}
          </CodeModal>
        </div>
        <Field disabled>
          <Label className="text-ld mb-1 block font-medium data-[disabled]:opacity-50">
            Type Here
          </Label>
          <Description className="text-bodytext text-xs mb-2 data-[disabled]:opacity-50">
            Add any extra information about your event here.
          </Description>
          <Textarea
            name="description"
            className="ui-form-control rounded-md data-[disabled]:bg-gray-100 dark:data-[disabled]:bg-dark"
            rows={6}
          ></Textarea>
        </Field>
      </CardBox>
    </div>
  );
};

export default DisableTextarea;
