import React from "react";
import CodeModal from "../../CodeModal";

const BasicTooltipCode = () => {
  return (
    <CodeModal>
      {`
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shadcn-ui/Default-Ui/tooltip"
import { Button } from '@/components/shadcn-ui/Default-Ui/button'

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
        `}
    </CodeModal>
  );
};

export default BasicTooltipCode;
