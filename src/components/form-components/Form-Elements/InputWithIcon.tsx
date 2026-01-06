import { Label, TextInput } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { HiMail } from "react-icons/hi";
const InputWithIcon = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Input groups with icon</h4>
        <div className="mb-[0.375rem]">
          <div className="pb-3">
            <div className="mb-2 block">
              <Label htmlFor="email4" value="Your email" />
            </div>
            <TextInput
              id="email4"
              type="email"
              icon={HiMail}
              placeholder="name@matdash.com"
              required className="form-control"
            />
          </div>
          <div className="pb-3">
            <div className="mb-2 block">
              <Label htmlFor="email4" value="Your email" />
            </div>
            <TextInput
              id="email4"
              type="email"
              rightIcon={HiMail}
              placeholder="name@matdash.com"
              required className="form-control"
            />
          </div>
          <div className="pb-3">
            <div className="mb-2 block">
              <Label htmlFor="email4" value="Your email" />
            </div>
            <TextInput
              id="email4"
              type="email"
              icon={HiMail}
              rightIcon={HiMail}
              placeholder="name@matdash.com"
              required className="form-control"
            /> 
          </div>
          <div className="pb-3">
            <div className="mb-2 block">
              <Label htmlFor="username3" value="Username" />
            </div>
            <TextInput
              id="username3"
              placeholder="Bonnie Green"
              addon="@"
              required className="form-control"
            />
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default InputWithIcon;
