import { Progress } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import LabelPositionCode from "./Code/LabelPositionCode";

const LabelPostionProgress = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
            Progress Bar Label Positioning
          </h4>
          <LabelPositionCode />
        </div>
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
      </CardBox>
    </div>
  );
};

export default LabelPostionProgress;
