import { Kbd } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const FunctionKeys = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Function keys</h4>
        <div className="flex flex-wrap gap-3">
          <Kbd>F1</Kbd>
          <Kbd>F2</Kbd>
          <Kbd>F3</Kbd>
          <Kbd>F4</Kbd>
          <Kbd>F5</Kbd>
          <Kbd>F6</Kbd>
          <Kbd>F7</Kbd>
          <Kbd>F8</Kbd>
          <Kbd>F9</Kbd>
          <Kbd>F10</Kbd>
          <Kbd>F11</Kbd>
          <Kbd>F12</Kbd>
        </div>
      </CardBox>
    </div>
  );
};

export default FunctionKeys;
