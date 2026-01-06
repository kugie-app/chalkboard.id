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
import { IconCirclePlus, IconPackage, IconPencilMinus } from "@tabler/icons-react";
const BillsTabs = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="lg:w-3/4 w-full">
          <OutlineCard className="shadow-none">
            <h5 className="card-title">Billing Information</h5>
            <div className="grid grid-cols-12 gap-6">
              <div className="md:col-span-6 col-span-12">
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="bnm" value="Business Name*" />
                    </div>
                    <TextInput
                      id="bnm"
                      type="text"
                      sizing="md"
                      placeholder="Visitors Analytics"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="banm" value="Business Address*" />
                    </div>
                    <TextInput
                      id="banm"
                      type="text"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="fnm" value="First Name*" />
                    </div>
                    <TextInput
                      id="fnm"
                      type="text"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 col-span-12">
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="bssector" value="Business Sector*" />
                    </div>
                    <TextInput
                      id="bssector"
                      type="text"
                      sizing="md"
                      placeholder="Arts, Media & Entertainment"
                      className="form-control"
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ct" value="Country*" />
                    </div>
                    <TextInput
                      id="ct"
                      type="text"
                      sizing="md"
                      placeholder="Romania"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="lnm" value="Last Name*" />
                    </div>
                    <TextInput
                      id="lnm"
                      type="text"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
          </OutlineCard>

          <OutlineCard className="shadow-none mt-[30px]">
            <h5 className="card-title">
              Current Plan : <span className="text-success">Executive</span>
            </h5>
            <p className="card-subtitle -mt-1">
              Thanks for being a premium member and supporting our development.
            </p>
            <div className="flex items-center mt-6">
              <div className="flex gap-3.5">
                <div className="flex justify-center h-12 w-12 rounded-md bg-muted dark:bg-darkmuted items-center text-dark dark:text-white">
                  <IconPackage />
                </div>
                <div>
                  <p className="text-sm text-bodytext">Current Plan</p>
                  <h6 className="text-base">750.000 Monthly Visits</h6>
                </div>
              </div>
              <div className="ms-auto">
                <Tooltip content="Add">
                  <IconCirclePlus
                    size={18}
                    className="text-dark dark:text-bodytext cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <Button color={"primary"}>Change Plan</Button>
              <Button color={"lighterror"}>Reset Plan</Button>
            </div>
          </OutlineCard>

          <OutlineCard className="shadow-none mt-[30px]">
            <h5 className="card-title">Payment Method</h5>
            <p className="card-subtitle -mt-1">On 26 December, 2023</p>
            <div className="flex items-center mt-6">
              <div className="flex gap-3.5">
                <div className="flex justify-center h-12 w-12 rounded-md bg-muted dark:bg-darkmuted items-center text-dark dark:text-white">
                  <IconPackage />
                </div>
                <div>
                  <h6 className="text-base">Visa</h6>
                  <p className="text-sm text-dark dark:text-bodytext">
                    *****2102
                  </p>
                </div>
              </div>
              <div className="ms-auto">
                <Tooltip content="Edit">
                  <IconPencilMinus
                    size={18}
                    className="text-dark dark:text-bodytext cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
            <p className="text-sm text-bodytext">If you updated your payment method, it will only be dislpayed here after your next billing cycle.</p>
            <Button color={"lighterror"} className="w-fit">Cancel Subscription</Button>
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

export default BillsTabs;
