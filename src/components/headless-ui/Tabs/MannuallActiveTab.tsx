import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import React from "react";
import CardBox from "../../shared/CardBox";
import ManuallActiveTabCodes from "./Code/ManuallActiveTabCode";

const MannuallActiveTab = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Manually Active Tab</h4>
          <ManuallActiveTabCodes />
        </div>
        <TabGroup manual>
          <TabList className="flex gap-3">
            <Tab className="rounded-md py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary">
              Tab 1
            </Tab>
            <Tab className="rounded-md py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary ">
              Tab 2
            </Tab>
            <Tab className="rounded-md py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary">
              Tab 3
            </Tab>
          </TabList>
          <TabPanels className="rounded-xl bg-lightgray dark:bg-dark p-3 mt-3">
            <TabPanel className="text-bodytext">
              One Lorem ipsum dolor sit amet, consectetur adipisici elit…’
              (complete text) is dummy text that is not meant to mean anything.
              It is used as a placeholder in magazine layouts, for example, in
              order to give an impression of the finished document.
            </TabPanel>
            <TabPanel className="text-bodytext">
              Two Lorem ipsum dolor sit amet, consectetur adipisici elit…’
              (complete text) is dummy text that is not meant to mean anything.
              It is used as a placeholder in magazine layouts, for example, in
              order to give an impression of the finished document.
            </TabPanel>
            <TabPanel className="text-bodytext">
              Three Lorem ipsum dolor sit amet, consectetur adipisici elit…’
              (complete text) is dummy text that is not meant to mean anything.
              It is used as a placeholder in magazine layouts, for example, in
              order to give an impression of the finished document.
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </CardBox>
    </div>
  );
};

export default MannuallActiveTab;
