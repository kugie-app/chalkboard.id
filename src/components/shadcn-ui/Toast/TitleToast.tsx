"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import CardBox from "../../shared/CardBox";
import TitleToastCode from "./code/TitleToastCode";

const TitleToast = () => {
  const { toast } = useToast();
  return (
    <div>
      <CardBox>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Toast With Title</h4>
        <TitleToastCode/>
      </div>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }}
        >
          Show Toast
        </Button>
      </CardBox>
    </div>
  );
};

export default TitleToast;
