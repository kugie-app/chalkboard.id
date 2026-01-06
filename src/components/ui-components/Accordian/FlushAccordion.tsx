"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Accordion } from "flowbite-react";
import FlushAccordiancode from "./Code/FlushAccordiancode";

const flushAccordian = () => {
  return (
    <>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Accordian Flush</h4>
          <FlushAccordiancode />
        </div>
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title className="focus:ring-0">
              Accordion Item #1
            </Accordion.Title>
            <Accordion.Content>
              <p>
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
              <p>
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
              <p>
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

export default flushAccordian;
