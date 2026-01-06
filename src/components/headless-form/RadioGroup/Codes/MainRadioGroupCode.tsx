import CodeModal from "@/components/ui-components/CodeModal";
import React from "react";

const MainRadioGroupCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import {
    Field,
    Label,
    Radio,
    RadioGroup,
    } from "@headlessui/react";
    import { useState } from "react";   
    const plans = ["Developing", "Designing", "Coding","Graphics Design","Accounting"];

    const [selected, setSelected] = useState(plans[0]);

    <RadioGroup
          value={selected}
          onChange={setSelected}
          aria-label="Server size"
          className="flex flex-col gap-3"
        >
          {plans.map((plan) => (
            <Field key={plan} className="flex items-center gap-2">
              <Radio
                value={plan}
                className="group flex size-5 items-center justify-center rounded-full border border-ld bg-white dark:bg-transparent data-[checked]:bg-primary dark:data-[checked]:bg-primary outline-0"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="text-sm text-ld">{plan}</Label>
            </Field>
          ))}
    </RadioGroup>
        `}
      </CodeModal>
    </div>
  );
};

export default MainRadioGroupCode;
