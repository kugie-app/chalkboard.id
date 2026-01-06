"use client";
import React from "react";
import OutlineCard from "../../shared/OutlineCard";
import Image from "next/image";
import { Button, Label, Select, TextInput } from "flowbite-react";

const AccountTab = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="md:col-span-6 col-span-12">
          <OutlineCard>
            <h5 className="card-title">Change Profile</h5>
            <p className="card-subtitle -mt-1">
              Change your profile picture from here
            </p>
            <div className="mx-auto text-center mt-5">
              <Image
                src="/images/profile/user-1.jpg"
                alt="logo"
                height="120"
                width="120"
                className="rounded-full mx-auto"
              />
              <div className="flex justify-center gap-3 py-6">
                <Button color={"primary"}>Upload</Button>
                <Button color={"lighterror"}>Reset</Button>
              </div>
              <p className="text-sm text-bodytext">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </OutlineCard>
        </div>
        <div className="md:col-span-6 col-span-12">
          <OutlineCard>
            <h5 className="card-title">Change Password</h5>
            <p className="card-subtitle -mt-1">
              To change your password please confirm here
            </p>
            <div className="flex flex-col gap-3 mt-3">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cpwd" value="Current Password" />
                </div>
                <TextInput
                  id="cpwd"
                  type="password"
                  sizing="md"
                  className="form-control"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="npwd" value="New Password" />
                </div>
                <TextInput
                  id="npwd"
                  type="password"
                  sizing="md"
                  className="form-control"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="cfpwd" value="Confirm Password" />
                </div>
                <TextInput
                  id="cfpwd"
                  type="password"
                  sizing="md"
                  className="form-control"
                />
              </div>
            </div>
          </OutlineCard>
        </div>

        <div className="col-span-12">
          <OutlineCard>
            <h5 className="card-title">Personal Details</h5>
            <p className="card-subtitle -mt-1">
              To change your personal detail , edit and save from here
            </p>
            <div className="grid grid-cols-12 gap-6">
              <div className="md:col-span-6 col-span-12">
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ynm" value="Your Name" />
                    </div>
                    <TextInput
                      id="ynm"
                      type="text"
                      sizing="md"
                      placeholder="Mathew Anderson"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="loc" value="Location" />
                    </div>
                    <Select id="countries" className="select-md" required>
                      <option selected>United States</option>
                      <option>Canada</option>
                      <option>France</option>
                      <option>Germany</option>
                    </Select>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ynm" value="Email" />
                    </div>
                    <TextInput
                      id="em"
                      type="email"
                      placeholder="info@MatDash.com"
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
                      <Label htmlFor="store" value="Store Name" />
                    </div>
                    <TextInput
                      id="store"
                      type="text"
                      sizing="md"
                      placeholder="Macima Studio"
                      className="form-control"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="curr" value="Currency" />
                    </div>
                    <Select id="curr" className="select-md" required>
                      <option selected>India (INR)</option>
                      <option value="1">US Dollar ($)</option>
                      <option value="2">United Kingdom (Pound)</option>
                      <option value="3">India (INR)</option>
                      <option value="3">Russia (Ruble)</option>
                    </Select>
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="ph" value="Phone" />
                    </div>
                    <TextInput
                      id="ph"
                      type="text"
                      sizing="md"
                      placeholder="+91 1234567895"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 -mt-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="add" value="Address" />
                  </div>
                  <TextInput
                    id="add"
                    type="text"
                    sizing="md"
                    placeholder="814 Howard Street, 120065, India"
                    className="form-control "
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-5">
              <Button color={"primary"}>Save</Button>
              <Button color={"lighterror"}>Cancel</Button>
            </div>
          </OutlineCard>
        </div>
      </div>
    </>
  );
};

export default AccountTab;
