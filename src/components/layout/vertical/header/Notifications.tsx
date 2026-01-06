
import { Icon } from "@iconify/react";
import { Badge, Button, Dropdown } from "flowbite-react";
import React from "react";
import * as Notification from "./Data";
import SimpleBar from "simplebar-react";
import Link from "next/link";

const Notifications = () => {

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] py-6  rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="relative">
            <span className="h-10 w-10 hover:bg-lightprimary text-darklink  dark:text-white rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              <Icon icon="solar:bell-bing-line-duotone" height={20} />
            </span>
            <span className="rounded-full absolute end-1 top-1 bg-error text-[10px] h-4 w-4 flex justify-center items-center text-white">
              5
            </span>
          </div>
        )}
      >
        <div className="flex items-center px-6 justify-between">
          <h3 className="mb-0 text-lg font-semibold text-ld">Notifications</h3>
          <Badge color={"primary"}>5 new</Badge>
        </div>

        <SimpleBar className="max-h-80 mt-3">
          {Notification.Notification.map((links, index) => (
            <Dropdown.Item
              as={Link}
              href="#"
              className="px-6 py-3 flex justify-between items-center bg-hover group/link w-full"
              key={index}
            >
              <div className="flex items-center w-full">
                <div
                  className={`h-11 w-11 flex-shrink-0 rounded-full flex justify-center items-center ${links.bgcolor} `}
                >
                  <Icon icon={links.icon} height={20} className={links.color} />
                </div>
                <div className="ps-4 flex justify-between w-full">
                  <div className="w-3/4 text-start">
                    <h5 className="mb-1 text-15 font-semibold group-hover/link:text-primary">
                      {links.title}
                    </h5>
                    <div className="text-sm text-bodytext line-clamp-1">
                      {links.subtitle}
                    </div>
                  </div>

                  <div className="text-xs block self-start pt-1.5">
                    {links.time}
                  </div>
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </SimpleBar>
        <div className="pt-5 px-6">
          <Button
            color={"primary"}
            className="w-full"
          >
            See All Notifications
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Notifications;
