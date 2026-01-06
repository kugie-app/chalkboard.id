"use client";
import {
  Tabs,
  Label,
  TextInput,
  Select,
  Datepicker,
  Button,
} from "flowbite-react";
import React from "react";
import TitleCard from "../../shared/TitleBorderCard";

const FormWithTabs = () => {
  return (
    <div>
      <TitleCard title="Form with Tabs">
        <Tabs aria-label="Full width tabs" className="gap-6">
          <Tabs.Item active title="Personal Info">
            <div className="grid grid-cols-12 gap-30">
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-30">
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="firstname" value="First Name" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="firstname"
                      type="text"
                      placeholder="John"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="country" value="Country" />
                  </div>
                  <div className="col-span-9">
                    <Select id="gender" required className="select-md">
                      <option>India</option>
                      <option>Europe</option>
                      <option>Franch</option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="birthdate" value="Birth Date" />
                  </div>
                  <div className="col-span-9">
                    <Datepicker className="form-control" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-30">
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="lastname" value="Last Name" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="lastname"
                      type="text"
                      placeholder="Deo"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="language" value="Language" />
                  </div>
                  <div className="col-span-9">
                    <Select id="gender" required className="select-md">
                      <option>English</option>
                      <option>Franch</option>
                      <option>Spanish</option>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="phone" value="Phone No" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="phone"
                      type="text"
                      placeholder="958 1475 458"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mt-30">
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="reset" color="error">
                Cancel
              </Button>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Account Details">
            <div className="grid grid-cols-12 gap-30">
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-30">
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="username"
                      type="text"
                      placeholder="John.Deo"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="password"
                      type="text"
                      placeholder="john.deo"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-30">
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="email"
                      type="text"
                      placeholder="john.deo@example.com"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="confirm" value="Confirm" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="confirm"
                      type="text"
                      placeholder="john.deo"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mt-30">
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="reset" color="error">
                Cancel
              </Button>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Social Links">
            <div className="grid grid-cols-12 gap-30">
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-30">
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="twitter" value="Twitter" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="twitter"
                      type="text"
                      placeholder="https://twitter.com/abc"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="google" value="Google" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="google"
                      type="text"
                      placeholder="https://plus.google.com/abc"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="instagram" value="Instagram" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="instagram"
                      type="text"
                      placeholder="https://instagram.com/abc"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-30">
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="facebook" value="Facebook" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="facebook"
                      type="text"
                      placeholder="https://facebook.com/abc"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="linkedin" value="Linkedin" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="linkedin"
                      type="text"
                      placeholder="https://linkedin.com/abc"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-7 items-center">
                  <div className="col-span-3">
                    <Label htmlFor="quora" value="Quora" />
                  </div>
                  <div className="col-span-9">
                    <TextInput
                      id="quora"
                      type="text"
                      placeholder="https://quora.com/abc"
                      sizing="md"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mt-30">
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button type="reset" color="error">
                Cancel
              </Button>
            </div>
          </Tabs.Item>
        </Tabs>
      </TitleCard>
    </div>
  );
};

export default FormWithTabs;
