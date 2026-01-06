"use client";
import { Toast, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { MdLoop } from "react-icons/md";
const InteractiveToast = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Interactive Toast</h4>
        <Toast>
          <div className="flex items-start">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300">
              <MdLoop className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Update available
              </span>
              <div className="mb-2 text-sm font-normal">
                A new software version is available for download.A new software
                version is available for download.A new software version is
                available for download.A new software version is available for
              </div>
              <div className="flex gap-2">
                <div className="w-auto">
                  <Button size="xs" color="primary">
                    Update
                  </Button>
                </div>
                <div className="w-auto">
                  <Button color="light" size="xs">
                    Not now
                  </Button>
                </div>
              </div>
            </div>
            <Toast.Toggle />
          </div>
        </Toast>
      </CardBox>
    </div>
  );
};

export default InteractiveToast;
