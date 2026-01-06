"use client";
import { Toast } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";
import { HiFire } from "react-icons/hi";
const DefaultToast = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-2">Default Toast</h4>
          <CodeModal>
            {`
    import { Toast } from "flowbite-react";
    import { HiFire } from "react-icons/hi";
    
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
        <HiFire className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">Set yourself free.</div>
      <Toast.Toggle />
    </Toast>  
                `}
          </CodeModal>
        </div>
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <HiFire className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Set yourself free.</div>
          <Toast.Toggle />
        </Toast>
      </CardBox>
    </div>
  );
};

export default DefaultToast;
