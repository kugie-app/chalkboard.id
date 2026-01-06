"use client";
import { ToggleSwitch } from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";

const ToggelSwitches = () => {
    const [switch1, setSwitch1] = useState(false);
    const [switch2, setSwitch2] = useState(true);
    const [switch3, setSwitch3] = useState(true);
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold">Toggle Switch</h4>
        <div className="flex max-w-md flex-col items-start gap-4 pb-7">
          <ToggleSwitch
            checked={switch1}
            label="Toggle me"
            onChange={setSwitch1}
          />
          <ToggleSwitch
            checked={switch2}
            label="Toggle me (checked)"
            onChange={setSwitch2}
          />
          <ToggleSwitch
            checked={false}
            disabled
            label="Toggle me (disabled)"
            onChange={() => undefined}
          />
          <ToggleSwitch
            checked={true}
            disabled
            label="Toggle me (disabled)"
            onChange={() => undefined}
          />
          <ToggleSwitch checked={switch3} onChange={setSwitch3} />
        </div>
      </CardBox>
    </div>
  );
};

export default ToggelSwitches;
