"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/Default-Ui/tooltip";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import BasicTooltipCode from "./code/BasicTooltipCode";

const BasicTooltip = () => {
  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Basic Tooltip</h4>
        <BasicTooltipCode />
      </div>
      <div className="flex flex-wrap items-center gap-5 mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Top Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent side="top">Top Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Right Side Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent side="right">Right Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="error">Bottom Side Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Bottom Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="warning">Left Side Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent side="left">Left Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CardBox>
  );
};

export default BasicTooltip;
