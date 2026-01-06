import { Label, TextInput } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const InputColors = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Input Element Colors</h4>
        <div className="grid grid-cols-12 gap-30">
          <div className="md:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="input-gray" color="gray" value="Gray" />
            </div>
            <TextInput
              id="input-gray"
              placeholder="Input Gray"
              required
              color="gray" className="form-control-validation"
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="input-info" color="info" value="Info" />
            </div>
            <TextInput
              id="input-info"
              placeholder="Input Info"
              required className="form-control-validation"
              color="info"
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="input-success" color="success" value="Success" />
            </div>
            <TextInput
              id="input-success"
              placeholder="Input Success"
              required className="form-control-validation"
              color="success"
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="input-failure" color="failure" value="Failure" />
            </div>
            <TextInput
              id="input-failure"
              placeholder="Input Failure"
              required className="form-control-validation"
              color="failure"
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="input-warning" color="warning" value="Warning" />
            </div>
            <TextInput
              id="input-warning"
              placeholder="Input Warning"
              required className="form-control-validation"
              color="warning"
            />
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default InputColors;
