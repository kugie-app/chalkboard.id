"use client";
import { Popover, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const DefaultPopover = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold ">Default popover</h4>
          <CodeModal>
            {`
    import { Button, Popover } from "flowbite-react";

    <Popover
      aria-labelledby="default-popover"
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b rounded-t-3xl border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3
              id="default-popover"
              className="font-semibold text-gray-900 dark:text-white"
            >
              Popover title
            </h3>
          </div>
          <div className="px-3 py-2">
            <p>
              And here's some amazing content. It's very engaging.
              Right?
            </p>
          </div>
        </div>
      }
    >
      <Button color="primary">Default popover</Button>
    </Popover>
                `}
          </CodeModal>
        </div>
        <Popover
          aria-labelledby="default-popover"
          content={
            <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
              <div className="border-b rounded-t-3xl border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3
                  id="default-popover"
                  className="font-semibold text-gray-900 dark:text-white"
                >
                  Popover title
                </h3>
              </div>
              <div className="px-3 py-2">
                <p>
                  And here's some amazing content. It's very engaging. Right?
                </p>
              </div>
            </div>
          }
        >
          <Button color="primary">Default popover</Button>
        </Popover>
      </CardBox>
    </div>
  );
};

export default DefaultPopover;
