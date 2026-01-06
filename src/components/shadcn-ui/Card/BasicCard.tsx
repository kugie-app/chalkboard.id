"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/Default-Ui/card";
import BasicCardCode from "./code/BasicCardCode";

const BasicCard = () => {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between w-full items-center">
          <div>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>Subtitle</CardDescription>
          </div>
          <BasicCardCode />
        </CardHeader>
        <CardContent>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default BasicCard;
