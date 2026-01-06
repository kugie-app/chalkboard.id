import { Label, TextInput, Select, Datepicker, Button } from "flowbite-react";
import React from "react";
import TitleCard from "../../shared/TitleBorderCard";

const MulticolFormSeprator = () => {
  return (
    <div>
      <TitleCard title="Multi Column With Form Separator">
        <div className="col-span-12 pb-6">
          <h6 className="text-lg">Account Details</h6>
        </div>
        <div className="grid lg:grid-cols-2    gap-6 pb-6">
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="username" value="Username" />
            </div>
            <div className="col-span-9">
              <TextInput
                id="username"
                type="text"
                placeholder="John Deo"
                sizing="md"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="email" value="Email" />
            </div>
            <div className="col-span-9">
              <TextInput
                id="email"
                type="text"
                placeholder="john.deo@example.com"
                sizing="md"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="password" value="Password" />
            </div>
            <div className="col-span-9">
              <TextInput
                id="password"
                type="password"
                placeholder="john.deo"
                sizing="md"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="confirmpassword" value="Confirm Password" />
            </div>
            <div className="col-span-9">
              <TextInput
                id="confirmpassword"
                type="password"
                placeholder="john.deo"
                sizing="md"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 pb-6 border-t border-border pt-5 dark:border-darkborder">
          <h6 className="text-lg">Personal Info</h6>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="firstname" value="First Name" />
            </div>
            <div className="col-span-9">
              <TextInput
                id="firstname"
                type="text"
                placeholder="Jordan"
                sizing="md"
                className="form-control"
              />
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="lastname" value="Last Name" />
            </div>
            <div className="col-span-9">
              <TextInput
                id="lastname"
                type="text"
                placeholder="Powell"
                sizing="md"
                className="form-control"
              />
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="country" value="Country" />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <Select id="gender" required className="select-md">
                <option>India</option>
                <option>Europe</option>
                <option>Franch</option>
              </Select>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="languange" value="Language" />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <Select id="gender" required className="select-md">
                <option>English</option>
                <option>Spenish</option>
                <option>Chinese</option>
              </Select>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="birthdate" value="Birth Date" />
            </div>
            <div className="col-span-9">
              <Datepicker className="form-control" />
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="phone" value="Phone No" />
            </div>
            <div className="col-span-9">
              <TextInput
                id="phone"
                type="text"
                placeholder="124 456 741"
                sizing="md"
                className="form-control"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-3"></div>
            <div className="col-span-9 flex items-center gap-[1rem]">
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="reset" color="error">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default MulticolFormSeprator;
