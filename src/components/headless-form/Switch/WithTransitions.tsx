"use client";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import CardBox from "../../shared/CardBox";
import WithTransitionCode from "./Codes/WithTransitionCode";


const WithTransitionsSwitch = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Adding Transitions</h4>
         <WithTransitionCode/>
        </div>
        <div className="flex flex-wrap gap-3">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition duration-700 data-[checked]:bg-primary"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition duration-700 group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition duration-700 data-[checked]:bg-secondary"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition duration-700 group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition duration-700 data-[checked]:bg-success"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition duration-700 group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition duration-700 data-[checked]:bg-error"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition duration-700 group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition duration-700 data-[checked]:bg-warning"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition duration-700 group-data-[checked]:translate-x-6" />
          </Switch>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition duration-700 data-[checked]:bg-info"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition duration-700 group-data-[checked]:translate-x-6" />
          </Switch>
        </div>
      </CardBox>
    </div>
  );
};

export default WithTransitionsSwitch;
