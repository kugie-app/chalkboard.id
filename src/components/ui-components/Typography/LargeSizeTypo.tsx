import { Blockquote } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const LargeSizeTypo = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Sizes Large</h4>
        <Blockquote className="text-2xl">
          "Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer"
        </Blockquote>
      </CardBox>
    </div>
  );
};

export default LargeSizeTypo;
