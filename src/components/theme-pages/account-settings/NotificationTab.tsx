"use client";
import React, { useState } from "react";
import OutlineCard from "../../shared/OutlineCard";
import {
  Button,
  Label,
  TextInput,
  ToggleSwitch,
  Tooltip,
} from "flowbite-react";
import {
  IconArticle,
  IconCheckbox,
  IconClock,
  IconDownload,
  IconMail,
  IconPlayerPause,
  IconTruckDelivery,
} from "@tabler/icons-react";

const NotificationTab = () => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);
  const [switch4, setSwitch4] = useState(false);
  const [switch5, setSwitch5] = useState(true);
  const [switch6, setSwitch6] = useState(false);

  const notificationTb = [
    {
      title: "Our newsletter",
      subtitle: "We will always let you know about important changes",
      icon: <IconArticle />,
      switch: switch1,
      switchfun: setSwitch1,
    },
    {
      title: "Order Confirmation",
      subtitle: "You will be notified when customer order any product",
      icon: <IconCheckbox />,
      switch: switch2,
      switchfun: setSwitch2,
    },
    {
      title: "Order Status Changed",
      subtitle: "You will be notified when customer make changes to the order",
      icon: <IconClock />,
      switch: switch3,
      switchfun: setSwitch3,
    },
    {
      title: "Order Delivered",
      subtitle: "You will be notified once the order is delivered",
      icon: <IconTruckDelivery />,
      switch: switch4,
      switchfun: setSwitch4,
    },
    {
      title: "Email Notification",
      subtitle: "Turn on email notificaiton to get updates through email",
      icon: <IconMail />,
      switch: switch5,
      switchfun: setSwitch5,
    },
  ];
  return (
    <>
      <div className="flex justify-center">
        <div className="lg:w-3/4 w-full">
          <OutlineCard className="shadow-none pb-0">
            <h5 className="card-title">Notification Preferences</h5>
            <p className="card-subtitle -mt-1">
              Select the notificaitons ou would like to receive via email.
              Please note that you cannot opt out of receving service messages,
              such as payment, security or legal notifications.
            </p>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="eml" value="Email" />
              </div>
              <TextInput
                id="eml"
                type="email"
                sizing="md"
                className="form-control"
              />
              <small className="text-sm text-bodytext">
                Required for notificaitons.
              </small>
            </div>

            <div>
              {notificationTb.map((item, i) => (
                <div className="flex mb-6 items-center">
                  <div className="flex gap-3.5">
                    <div className="flex justify-center h-12 w-12 rounded-md bg-muted dark:bg-darkmuted items-center text-dark dark:text-white">
                      {item.icon}
                    </div>
                    <div>
                      <h6 className="text-base">{item.title}</h6>
                      <p className="text-sm text-bodytext">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <ToggleSwitch
                      checked={item.switch}
                      onChange={item.switchfun}
                    />
                  </div>
                </div>
              ))}
            </div>
          </OutlineCard>
          <OutlineCard className="mt-[30px] shadow-none ">
            <h5 className="card-title">Date & Time</h5>
            <p className="card-subtitle -mt-1">
              Time zones and calendar display settings.
            </p>
            <div className="flex items-center mt-6">
              <div className="flex gap-3.5">
                <div className="flex justify-center h-12 w-12 rounded-md bg-muted dark:bg-darkmuted items-center text-dark dark:text-white">
                  <IconClock />
                </div>
                <div>
                  <p className="text-sm text-bodytext">Time zone</p>
                  <h6 className="text-base">(UTC + 02:00) Athens, Bucharet</h6>
                </div>
              </div>
              <div className="ms-auto">
                <Tooltip content="Download">
                  <IconDownload
                    size={18}
                    className="text-dark dark:text-bodytext cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
          </OutlineCard>

          <OutlineCard className="mt-[30px] shadow-none">
            <h5 className="card-title">Ignore Tracking</h5>
            <div className="flex items-center mt-5">
              <div className="flex gap-3.5">
                <div className="flex justify-center h-12 w-12 rounded-md bg-muted dark:bg-darkmuted items-center text-dark dark:text-white">
                  <IconPlayerPause />
                </div>
                <div>
                  <h6 className="text-base">Ignore Browser Tracking</h6>
                  <p className="text-sm text-bodytext">Browser Cookie</p>
                </div>
              </div>
              <div className="ms-auto">
                <ToggleSwitch checked={switch6} onChange={setSwitch6} />
              </div>
            </div>
          </OutlineCard>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-7">
        <Button color={"primary"}>Save</Button>
        <Button color={"lighterror"}>Cancel</Button>
      </div>
    </>
  );
};

export default NotificationTab;
