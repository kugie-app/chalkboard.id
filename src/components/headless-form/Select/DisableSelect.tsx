import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";
import { Description, Field, Label, Select } from "@headlessui/react";

const DisabledSelect = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between ">
          <h4 className="text-lg font-semibold">Disabeld Select</h4>
          <CodeModal>
            {`
    import { Field, Label, Select,Description } from "@headlessui/react";    
     
    <Field disabled>
          <Label className="text-ld mb-1 block data-[disabled]:opacity-50">Project status</Label>
          <Description className="mb-2 text-bodytext text-xs data-[disabled]:opacity-50">This will be visible to clients on the project.</Description>
          <Select
            name="status"
            aria-label="Project status"
            className="ui-form-control rounded-md data-[disabled]:opacity-50"
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
        <Field disabled>
          <Label className="text-ld mb-1 block data-[disabled]:opacity-50">
            Project status
          </Label>
          <Description className="mb-2 text-bodytext text-xs data-[disabled]:opacity-50">
            This will be visible to clients on the project.
          </Description>
          <Select
            name="status"
            aria-label="Project status"
            className="ui-form-control rounded-md data-[disabled]:opacity-50"
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

export default DisabledSelect;
