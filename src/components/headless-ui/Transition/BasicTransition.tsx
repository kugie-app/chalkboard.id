"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Transition } from '@headlessui/react'
import BasicTransactionCode from "./Codes/BasicTransactionCode";



const BasicTransition = () => {
    const [open, setOpen] = useState(false)
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Basic Transition</h4>
          <BasicTransactionCode/>
        </div>
        <button onClick={() => setOpen((open) => !open)} className="ui-button bg-primary justify-center">Toggle Transition</button>
        <Transition show={open}>
            <div className="transition duration-300 ease-in data-[closed]:opacity-0 bg-lightgray dark:bg-dark rounded-sm shadow-md dark:shadow-dark-md p-4 w-72 ">I will fade in and out</div>
        </Transition>
      </CardBox>
    </div>
  );
};

export default BasicTransition;
