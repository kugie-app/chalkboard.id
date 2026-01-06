"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Accordion } from "flowbite-react";
import BasicAccordiancode from "./Code/BasicAccordiancode";

const basicAccordion = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Accordion</h4>
           <BasicAccordiancode/> 
        </div>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title className="focus:ring-0">
              Accordion Item #1
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 ">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="focus:ring-0">
              Accordion Item #2
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 ">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title className="focus:ring-0">
              Accordion Item #3
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 ">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </CardBox>
    </>
  );
};

export default basicAccordion;
