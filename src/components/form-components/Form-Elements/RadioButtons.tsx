import { Radio, Label } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const RadioButtons = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Radio Button</h4>
        <fieldset className="flex max-w-md flex-col gap-4 pb-6">
          <legend className="mb-4">Choose your favorite country</legend>
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
            <Radio id="germany" name="countries" value="Germany" />
            <Label htmlFor="germany">Germany</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="spain" name="countries" value="Spain" />
            <Label htmlFor="spain">Spain</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="uk" name="countries" value="United Kingdom" />
            <Label htmlFor="uk">United Kingdom</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="china" name="countries" value="China" disabled />
            <Label htmlFor="china" disabled>
              China (disabled)
            </Label>
          </div>
        </fieldset>
      </CardBox>
    </div>
  );
};

export default RadioButtons;
