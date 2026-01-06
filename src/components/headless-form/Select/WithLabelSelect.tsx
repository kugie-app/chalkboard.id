import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";
import { Field, Label, Select } from "@headlessui/react";

const WithLabelSelect = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">With Label Select</h4>
          <CodeModal>
            {`
    import { Field, Label, Select } from "@headlessui/react";    
       
    <Field>
          <Label className="text-ld mb-2 block">Project status</Label>
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
          <Label className="text-ld mb-2 block">Project status</Label>
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

export default WithLabelSelect;
