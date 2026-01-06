"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import CardBox from "../../shared/CardBox";

const PrimaryToast = () => {
  const { toast } = useToast();
  return (
    <div>
      <CardBox>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Primary Toast</h4>
      </div>
        <Button
          onClick={() => {
            toast({
              variant: "primary",
              title: "This is primary toast.",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
             
            });
          }}
        >
          Show Toast
        </Button>
      </CardBox>
    </div>
  );
};

export default PrimaryToast;
