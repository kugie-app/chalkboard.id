import { Kbd } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const DefaultKbd = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default KDB</h4>
          <CodeModal>
            {`
  import { Kbd } from "flowbite-react";
  
  <div className="flex flex-wrap gap-3">
    <Kbd className="rounded-md">Shift</Kbd>
    <Kbd className="rounded-md">Ctrl</Kbd>
    <Kbd className="rounded-md">Tab</Kbd>
    <Kbd className="rounded-md">Caps Lock</Kbd>
    <Kbd className="rounded-md">Esc</Kbd>
    <Kbd className="rounded-md">Spacebar</Kbd>
    <Kbd className="rounded-md">Enter</Kbd>
  </div>
                `}
          </CodeModal>
        </div>
        <div className="flex flex-wrap gap-3">
          <Kbd className="rounded-md">Shift</Kbd>
          <Kbd className="rounded-md">Ctrl</Kbd>
          <Kbd className="rounded-md">Tab</Kbd>
          <Kbd className="rounded-md">Caps Lock</Kbd>
          <Kbd className="rounded-md">Esc</Kbd>
          <Kbd className="rounded-md">Spacebar</Kbd>
          <Kbd className="rounded-md">Enter</Kbd>
        </div>
      </CardBox>
    </div>
  );
};

export default DefaultKbd;
