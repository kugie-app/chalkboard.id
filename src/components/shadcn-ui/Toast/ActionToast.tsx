"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import { ToastAction } from "@/components/shadcn-ui/Default-Ui/toast";
import CardBox from "../../shared/CardBox";
import ActionToastCode from "./code/ActionToastCode";

const ActionToast = () => {
  const { toast } = useToast();
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Toast With Action</h4>
          <ActionToastCode/>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            toast({
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

export default ActionToast;
