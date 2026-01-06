"use client";
import React from "react";
import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/Default-Ui/card";
import { Switch } from "@/components/shadcn-ui/Default-Ui/switch";
import { BellRing, Check } from "lucide-react";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const NotificationCard = () => {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between w-full items-center">
          <CardTitle>Notification Card</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className=" flex items-center space-x-4 rounded-md border border-ld p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-15 font-semibold text-ld leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-darklink dark:text-bodytext">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-15 font-semibold text-ld  leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-darklink dark:text-bodytext">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default NotificationCard;
