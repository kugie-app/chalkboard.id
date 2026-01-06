import React from "react";
import { Textarea } from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";
const BasicTextarea = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Basic Textarea</h4>
          <CodeModal>
            {`
    import { Textarea } from "@headlessui/react";

    <Textarea
        name="description"
        className="ui-form-control"
        rows={3}
      ></Textarea>
            `}
          </CodeModal>
        </div>
        <Textarea
          name="description"
          className="ui-form-control rounded-md"
          rows={6}
        ></Textarea>
      </CardBox>
    </div>
  );
};

export default BasicTextarea;
