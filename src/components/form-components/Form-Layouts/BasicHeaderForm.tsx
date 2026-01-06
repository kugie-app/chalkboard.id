import {
  Alert,
  Label,
  TextInput,
  Select,
  Datepicker,
  Radio,
  Button,
} from "flowbite-react";
import React from "react";
import TitleCard from "../../shared/TitleBorderCard";
import { HiInformationCircle } from "react-icons/hi";
const BasicHeaderForm = () => {
  return (
    <div>
      <TitleCard title="Basic Header Form">
        <div className="pb-6">
          <Alert color="lightprimary" icon={HiInformationCircle}>
            <span className="font-medium">Person Info</span>
          </Alert>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="base" value="First Name" />
            </div>
            <TextInput
              id="base"
              type="text"
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Last Name" />
            </div>
            <TextInput
              id="base"
              type="text"
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="gender" value="Select Gender" />
            </div>
            <Select id="gender" required className="select-md">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
          </div>
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="birth" value="Date of Birth" />
            </div>
            <Datepicker className="form-control" />
          </div>
          <div className="col-span-12">
            <Label htmlFor="membership" className="mb-3 inline-block">
              Membership
            </Label>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 pb-2">
                <Radio
                  id="membership"
                  name="membership"
                  value="free"
                  defaultChecked
                />
                <Label htmlFor="united-state">Free</Label>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Radio
                  id="paid"
                  name="membership"
                  value="paid"
                  defaultChecked
                />
                <Label htmlFor="united-state">Paid</Label>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <Alert color="lightprimary" icon={HiInformationCircle}>
              <span className="font-medium">Address</span>
            </Alert>
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="street" value="Street" />
            </div>
            <TextInput
              id="street"
              type="text"
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="city" value="City" />
            </div>
            <TextInput
              id="city"
              type="text"
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="state" value="State" />
            </div>
            <TextInput
              id="state"
              type="text"
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="postcode" value="Post Code" />
            </div>
            <TextInput
              id="postcode"
              type="text"
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="sm:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="countr" value="Country" />
            </div>
            <Select id="countr" required className="select-md">
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
          </div>
          <div className="col-span-12 flex items-center gap-[1rem]">
            <Button type="reset" color="error">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default BasicHeaderForm;
