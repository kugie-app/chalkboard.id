"use client";
import {
  Description,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import RadioGroupWithDescCode from "./Codes/RadioGroupWithDescCode";

const plans = [
  { name: "Startup", description: "12GB, 6 CPUs, 256GB SSD disk" },
  { name: "Business", description: "16GB, 8 CPUs, 512GB SSD disk" },
  { name: "Enterprise", description: "32GB, 12 CPUs, 1TB SSD disk" },
];

const RadioGroupWithDesc = () => {
  const [selected, setSelected] = useState(plans[0]);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
            With Description
          </h4>
          <RadioGroupWithDescCode/>
        </div>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          aria-label="Server size"
          className="flex flex-col gap-3"
        >
          {plans.map((plan) => (
            <Field key={plan.name} className="flex items-center gap-3 bg-lightgray dark:bg-dark py-2 px-4 rounded-md ">
              <Radio
                value={plan}
                className="group cursor-pointer flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible " />
              </Radio>
              <div >
                <Label className="text-ld cursor-pointer">{plan.name}</Label>
                <Description className="text-bodytext text-xs">
                  {plan.description}
                </Description>
              </div>
            </Field>
          ))}
        </RadioGroup>
      </CardBox>
    </div>
  );
};

export default RadioGroupWithDesc;
