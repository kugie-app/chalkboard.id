import { Label } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { RangeSlider } from "flowbite-react";
const RangeSliders = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Range slider</h4>
        <div className="flex max-w-md flex-col gap-4 pb-12">
          <div>
            <div className="mb-1 block">
              <Label htmlFor="default-range" value="Default" />
            </div>
            <RangeSlider id="default-range" />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="disbaled-range" value="Disabled" />
            </div>
            <RangeSlider id="disabled-range" disabled />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="sm-range" value="Small" />
            </div>
            <RangeSlider id="default-range" sizing="sm" />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="md-range" value="Medium" />
            </div>
            <RangeSlider id="default-range" sizing="md" />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="lg-range" value="Large" />
            </div>
            <RangeSlider id="default-range" sizing="lg" />
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default RangeSliders;
