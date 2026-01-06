import { Blockquote } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const BlockOutTypo = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Default blockquote</h4>
        <Blockquote>
          "Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting"
        </Blockquote>
      </CardBox>
    </div>
  );
};

export default BlockOutTypo;
