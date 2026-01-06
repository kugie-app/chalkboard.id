import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";
import { Description, Field, Label, Select } from "@headlessui/react";

const WithDescriptionSelect = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between ">
          <h4 className="text-lg font-semibold">With Descrioption Select</h4>
          <CodeModal>
            {`
    import { Field, Label, Select,Description } from "@headlessui/react";    
     
    <Field>
          <Label className="text-ld mb-1 block">Project status</Label>
          <Description className="mb-2 text-bodytext text-xs">This will be visible to clients on the project.</Description>
          <Select
            name="status"
            aria-label="Project status"
            className="ui-form-control rounded-md"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
          </Select>
    </Field>
        `}
          </CodeModal>
        </div>
        <Field>
          <Label className="text-ld mb-1 block">Project status</Label>
          <Description className="mb-2 text-bodytext text-xs">This will be visible to clients on the project.</Description>
          <Select
            name="status"
            aria-label="Project status"
            className="ui-form-control rounded-md"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
          </Select>
        </Field>
      </CardBox>
    </div>
  );
};

export default WithDescriptionSelect;
