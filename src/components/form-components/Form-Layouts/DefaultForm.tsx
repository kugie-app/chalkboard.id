import {
  Label,
  TextInput,
  Textarea,
  Checkbox,
  Radio,
  Select,
  Button,
} from "flowbite-react";
import React from "react";
import TitleCard from "../../shared/TitleBorderCard";

const DefaultForm = () => {
  return (
    <div>
      <TitleCard title="Default Form">
        <div className="grid grid-cols-6 gap-[1.875rem]">
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="Default Text" value="Default Text" />
            </div>
            <TextInput
              id="default"
              type="text"
              placeholder="Marcal"
              sizing="md"
              className="form-control"
            />
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@matdash.com"
              className="form-control"
              required
            />
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              className="form-control"
              required
            />
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Your message" />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required
              className="form-control-textarera rounded-md"
              rows={4}
            />
          </div>
          <div className="sm:flex items-center gap-[1.875rem] col-span-12">
            <div className="flex flex-col gap-[1rem]">
              <div className="flex items-center gap-2">
                <Checkbox id="promotion" className="checkbox" />
                <Label htmlFor="promotion">
                  I want to get promotional offers
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion1" className="checkbox" />
                <Label htmlFor="promotion1">
                  I want to get promotional offers
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion2" className="checkbox" />
                <Label htmlFor="promotion2">
                  I want to get promotional offers
                </Label>
              </div>
            </div>
            <div className="flex flex-col gap-[1rem] md:mt-0  mt-6">
              <div className="flex items-center gap-2">
                <Radio
                  id="united-state"
                  name="countries"
                  value="USA"
                  defaultChecked
                />
                <Label htmlFor="united-state">United States</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="united-state1" name="countries" value="Germany" />
                <Label htmlFor="united-state1">United States</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="united-state2" name="countries" value="Spain" />
                <Label htmlFor="united-state2">United States</Label>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select" />
            </div>
            <Select id="countries" required className="select-md">
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
            <div className="pt-5">
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default DefaultForm;
