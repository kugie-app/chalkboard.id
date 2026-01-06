"use client";

import { CustomizerContext } from "@/app/context/CustomizerContext";

import { Card } from "flowbite-react";
import React, { useContext } from "react";


interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  const { activeMode, isCardShadow, isBorderRadius } = useContext(CustomizerContext);
  return (
    <Card className={`card ${className} ${isCardShadow ? ' shadow-md dark:shadow-none' : 'shadow-none border border-ld'} `}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >{children}</Card>
  );

};
export default CardBox;
