import React from "react";
import { Field, Label, Textarea } from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";
const WithLabelTextarea = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Label With Textarea</h4>
          <CodeModal>
            {`
    import { Textarea } from "@headlessui/react";

    <Field>
        <Label className="text-ld mb-2 block ">Description</Label>
        <Textarea
        name="description"
        className="ui-form-control rounded-md"
        rows={4}
        ></Textarea>
    </Field>
            `}
          </CodeModal>
        </div>
        <Field>
          <Label className="text-ld mb-2 block font-medium">Description</Label>
          <Textarea
            name="description"
            className="ui-form-control rounded-md"
            rows={4}
          ></Textarea>
        </Field>
      </CardBox>
    </div>
  );
};

export default WithLabelTextarea;
