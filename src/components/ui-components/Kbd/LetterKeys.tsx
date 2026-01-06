import { Kbd } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const LetterKeys = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Letter Keys</h4>
        <div className="flex flex-wrap gap-3">
          <Kbd>Q</Kbd>
          <Kbd>W</Kbd>
          <Kbd>E</Kbd>
          <Kbd>R</Kbd>
          <Kbd>T</Kbd>
          <Kbd>Y</Kbd>
          <Kbd>I</Kbd>
          <Kbd>O</Kbd>
          <Kbd>P</Kbd>
          <Kbd>A</Kbd>
          <Kbd>S</Kbd>
          <Kbd>D</Kbd>
          <Kbd>F</Kbd>
          <Kbd>G</Kbd>
          <Kbd>H</Kbd>
          <Kbd>J</Kbd>
          <Kbd>K</Kbd>
          <Kbd>L</Kbd>
          <Kbd>Z</Kbd>
          <Kbd>X</Kbd>
          <Kbd>C</Kbd>
          <Kbd>V</Kbd>
          <Kbd>B</Kbd>
          <Kbd>N</Kbd>
          <Kbd>M</Kbd>
        </div>
      </CardBox>
    </div>
  );
};

export default LetterKeys;
