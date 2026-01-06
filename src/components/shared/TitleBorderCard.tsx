"use client";
import { CustomizerContext } from "@/app/context/CustomizerContext";
import { Card, Button } from "flowbite-react";
import React, { useContext } from "react";
import { Icon } from "@iconify/react";

interface TitleCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: string;
  onDownload?: () => void;
}

const TitleCard: React.FC<TitleCardProps> = ({
  children,
  className,
  title,
  onDownload,
}) => {
  const { activeMode, isCardShadow, isBorderRadius } =
    useContext(CustomizerContext);

  return (
    <Card
      className={`card ${className} ${
        isCardShadow
          ? "dark:shadow-dark-md shadow-md p-0"
          : "shadow-none border border-ld p-0"
      }`}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >
      <div className="flex justify-between items-center border-b border-ld px-6 py-4">
        <h5 className="text-xl font-semibold">{title}</h5>
      </div>
      <div className="pt-4 p-6">{children}</div>
    </Card>
  );
};

export default TitleCard;
