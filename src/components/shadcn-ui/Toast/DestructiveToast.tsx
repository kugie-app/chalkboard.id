"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import { ToastAction } from "@/components/shadcn-ui/Default-Ui/toast";
import CardBox from "../../shared/CardBox";
import DestrictiveToastCode from "./code/DesctructiveToastCode";

const DestructiveToast = () => {
  const { toast } = useToast();
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Destructive Toast</h4>
          <DestrictiveToastCode />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          Show Toast
        </Button>
      </CardBox>
    </div>
  );
};

export default DestructiveToast;
