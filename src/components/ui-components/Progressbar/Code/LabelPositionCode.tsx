import React from "react";
import CodeModal from "../../CodeModal";

const LabelPositionCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Progress } from "flowbite-react";
    
    <Progress
          progress={20}
          progressLabelPosition="inside"
          textLabel="matdash"
          textLabelPosition="outside"
          size="lg"
          labelProgress
          labelText
    />
    <Progress
        progress={40}
        progressLabelPosition="inside"
        textLabel="matdashPro"
        textLabelPosition="outside"
        size="lg"
        labelProgress
        labelText
    />
    <Progress
        progress={60}
        progressLabelPosition="inside"
        textLabel="AdminProPro"
        textLabelPosition="outside"
        size="lg"
        labelProgress
        labelText
    />
        <Progress
        progress={80}
        progressLabelPosition="inside"
        textLabel="Flexy"
        textLabelPosition="outside"
        size="lg"
        labelProgress
        labelText
    />
        <Progress
        progress={100}
        progressLabelPosition="inside"
        textLabel="Spike"
        textLabelPosition="outside"
        size="lg"
        labelProgress
        labelText
    />
            `}
      </CodeModal>
    </div>
  );
};

export default LabelPositionCode;
