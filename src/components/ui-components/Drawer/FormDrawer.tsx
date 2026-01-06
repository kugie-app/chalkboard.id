"use client";
import {
  Button,
  Drawer,
  Label,
  TextInput,
  Textarea,
  Datepicker,
  theme,
  Avatar,
} from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import { HiCalendar, HiUserAdd } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import FormDrawerCode from "./Code/FormDrawerCode";
const FormDrawer = () => {
  const [isElement, setIsOpen] = useState(false);
  const elementClose = () => setIsOpen(false);

  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Form Drawer</h4>
          <FormDrawerCode/>
        </div>
        <Button color={"error"} onClick={() => setIsOpen(true)}>
          Show Drawer
        </Button>
        <Drawer open={isElement} onClose={elementClose} className="p-4">
          <Drawer.Header title="NEW EVENT" titleIcon={HiCalendar} />
          <Drawer.Items>
            <form action="#">
              <div className="mb-6 mt-3">
                <Label htmlFor="title" className="mb-2 block">
                  Title
                </Label>
                <TextInput
                  id="title"
                  name="title"
                  placeholder="Apple Keynote"
                  className="form-control"
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="description" className="mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write event description..."
                  rows={4}
                  className="form-control"
                />
              </div>
              <div className="mb-6">
                <Datepicker className="form-control" />
              </div>
              <div className="mb-6">
                <TextInput
                  id="guests"
                  name="guests"
                  placeholder="Add guest email"
                  type="search"
                  className="form-control"
                  rightIcon={() => (
                    <Button
                      size="sm"
                      className="[&>span]:items-center [&>span]:px-2 [&>span]:py-0"
                      color="primary"
                    >
                      <HiUserAdd className="mr-2" />
                      Add
                    </Button>
                  )}
                  theme={{
                    field: {
                      rightIcon: {
                        base: twMerge(
                          theme.textInput.field.rightIcon.base,
                          "pointer-events-auto"
                        ),
                      },
                    },
                  }}
                />
              </div>
              <Avatar.Group className="mb-6">
                <Avatar
                  alt=""
                  img="/images/profile/user-2.jpg"
                  rounded
                  size="sm"
                  stacked
                />
                <Avatar
                  alt=""
                  img="/images/profile/user-3.jpg"
                  rounded
                  size="sm"
                  stacked
                />
                <Avatar
                  alt=""
                  img="/images/profile/user-4.jpg"
                  rounded
                  size="sm"
                  stacked
                />
                <Avatar
                  alt=""
                  img="/images/profile/user-5.jpg"
                  rounded
                  size="sm"
                  stacked
                />
              </Avatar.Group>
              <Button className="w-full" color="primary">
                <HiCalendar className="mr-2" />
                Create event
              </Button>
            </form>
          </Drawer.Items>
        </Drawer>
      </CardBox>
    </div>
  );
};

export default FormDrawer;
