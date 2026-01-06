"use client";

import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/Default-Ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/Default-Ui/dialog";
import { IconCode } from "@tabler/icons-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";

const CodeModal = ({ children }: { children: string }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);

  return (
    <div className="code-modal">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleModal}
              className="h-8 w-8 rounded-full bg-lightprimary hover:bg-primary hover:text-white text-primary"
            >
              <IconCode size={18} className="group-hover:text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="whitespace-nowrap bg-primary text-white py-1.5 text-xs px-2">
            <p>Show Code</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-[80vh] max-w-2xl p-4 code-modal">
          <DialogHeader>
            <DialogTitle>Sample Code</DialogTitle>
          </DialogHeader>
          {/* @ts-ignore - SyntaxHighlighter component compatibility with React 19 */}
          <SyntaxHighlighter language="html" style={atomDark}>
            {children}
          </SyntaxHighlighter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeModal;
