import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const HeadingsTyp = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Headings</h4>
          <CodeModal>
            {`
      <div>
        <h1 className="font-semibold text-4xl">h1.Heading</h1>
        <h2 className="font-semibold text-3xl">h2.Heading</h2>
        <h3 className="font-semibold text-2xl">h3.Heading</h3>
        <h4 className="font-semibold text-xl">h4.Heading</h4>
        <h5 className="font-semibold text-lg">h5.Heading</h5>
        <h6 className="font-semibold text-base">h6.Heading</h6>
      </div>    
                `}
          </CodeModal>
        </div>
        <div>
          <h1 className="font-semibold text-4xl">h1.Heading</h1>
          <h2 className="font-semibold text-3xl">h2.Heading</h2>
          <h3 className="font-semibold text-2xl">h3.Heading</h3>
          <h4 className="font-semibold text-xl">h4.Heading</h4>
          <h5 className="font-semibold text-lg">h5.Heading</h5>
          <h6 className="font-semibold text-base">h6.Heading</h6>
        </div>
      </CardBox>
    </div>
  );
};

export default HeadingsTyp;
