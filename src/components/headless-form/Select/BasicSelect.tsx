import { Select } from "@headlessui/react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../../ui-components/CodeModal";

const BasicSelect = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Basic Select</h4>
          <CodeModal>
            {`
    import { Select } from "@headlessui/react";    
         
    <Select name="status" aria-label="Project status" className="ui-form-control rounded-md">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
        <option value="canceled">Canceled</option>
    </Select>
            `}
          </CodeModal>
        </div>
        <Select
          name="status"
          aria-label="Project status"
          className="ui-form-control rounded-md my-4"
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="delayed">Delayed</option>
          <option value="canceled">Canceled</option>
        </Select>
      </CardBox>
    </div>
  );
};

export default BasicSelect;
