import { Popover, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const TriggerType = () => {
  const contentdata = (
    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Popover title
        </h3>
      </div>
      <div className="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
    </div>
  );
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Trigger Type</h4>
        <div className="flex gap-2">
          <Popover content={contentdata} trigger="hover">
            <Button color="primary">Popover hover</Button>
          </Popover>
          <Popover content={contentdata} trigger="click">
            <Button color="primary">Popover click</Button>
          </Popover>
        </div>
      </CardBox>
    </div>
  );
};

export default TriggerType;
