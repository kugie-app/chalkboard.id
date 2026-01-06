"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import CardBox from "../../shared/CardBox";

const SecondaryToast = () => {
  const { toast } = useToast();
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Secondary Toast</h4>
        </div>
        <Button
          variant={"secondary"}
          onClick={() => {
            toast({
              variant: "secondary",
              title: "This is secondary toast.",
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
            });
          }}
        >
          Show Toast
        </Button>
      </CardBox>
    </div>
  );
};

export default SecondaryToast;
