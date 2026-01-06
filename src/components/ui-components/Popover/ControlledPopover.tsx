"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Popover, Label, TextInput, Button } from "flowbite-react";
import CodeModal from "../CodeModal";
import { BiCaretDown } from "react-icons/bi";
const ControlledPopover = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Controlled</h4>
          <CodeModal>
            {`
      <Popover
        aria-labelledby="area-popover"
        open={open}
        onOpenChange={setOpen}
        content={
          <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400">
            <div>
              <h2 id="area-popover" className="text-base text-gray-500">
                Area (sqft)
              </h2>
              <div className="mb-2 block">
                <Label htmlFor="minsqft" value="Minimum sqft" />
              </div>
              <TextInput id="minsqft" type="number" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="maxsqft" value="Maximum sqft" />
              </div>
              <TextInput id="maxsqft" type="number" />
            </div>
            <div className="flex gap-2">
              <Button color="gray">Reset</Button>
              <Button color="primary" onClick={() => setOpen(false)}>
                Save
              </Button>
            </div>
          </div>
        }
      >
        <Button color="primary">
          Area <BiCaretDown className="ml-2" />
        </Button>
      </Popover>  
                `}
          </CodeModal>
        </div>
        <Popover
          aria-labelledby="area-popover"
          open={open}
          onOpenChange={setOpen}
          content={
            <div className="flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400 ">
              <div>
                <h2 id="area-popover" className="text-base text-gray-500">
                  Area (sqft)
                </h2>
                <div className="mb-2 block">
                  <Label htmlFor="minsqft" value="Minimum sqft" />
                </div>
                <TextInput id="minsqft" type="number" />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="maxsqft" value="Maximum sqft" />
                </div>
                <TextInput id="maxsqft" type="number" />
              </div>
              <div className="flex gap-2">
                <Button color="gray">Reset</Button>
                <Button color="primary" onClick={() => setOpen(false)}>
                  Save
                </Button>
              </div>
            </div>
          }
        >
          <Button color="primary">
            Area <BiCaretDown className="ml-2" />
          </Button>
        </Popover>
      </CardBox>
    </div>
  );
};

export default ControlledPopover;
