"use client";
import {
  Accordion,
  Label,
  TextInput,
  Textarea,
  Select,
  Radio,
  Button,
} from "flowbite-react";
import React from "react";
import TitleCard from "../../shared/TitleBorderCard";

const CollapsibleSection = () => {
  return (
    <div>
      <TitleCard title="Collapsible Section">
        <div>
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title className="text-lg font-semibold">
                Delivery Address
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid grid-cols-12 gap-30">
                  <div className="lg:col-span-6 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="fullname" value="Full Name" />
                    </div>
                    <div className="col-span-9">
                      <TextInput
                        id="fullname"
                        type="text"
                        placeholder="John Deo"
                        sizing="md"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-6 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="phone" value="Phone No" />
                    </div>
                    <div className="col-span-9">
                      <TextInput
                        id="phone"
                        type="text"
                        placeholder="425 7545 6321"
                        sizing="md"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="address" value="Address" />
                    </div>
                    <div className="col-span-9">
                      <Textarea
                        id="address"
                        placeholder="150, Ring Road"
                        required
                        className="form-control-textarera rounded-md"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-6 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="pincode" value="Pincode" />
                    </div>
                    <div className="col-span-9">
                      <TextInput
                        id="pincode"
                        type="text"
                        placeholder="687541"
                        sizing="md"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-6 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="landmark" value="Landmark" />
                    </div>
                    <div className="col-span-9">
                      <TextInput
                        id="landmark"
                        type="text"
                        placeholder="Nr. Wall Street"
                        sizing="md"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-6 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="city" value="City" />
                    </div>
                    <div className="col-span-9">
                      <TextInput
                        id="city"
                        type="text"
                        placeholder="Jackson"
                        sizing="md"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-6 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="state" value="State" />
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                      <Select id="gender" required className="select-md">
                        <option>Dubai</option>
                        <option>Polend</option>
                        <option>Bangladesh</option>
                      </Select>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="mb-2">
                      <Label htmlFor="addresstype" value="Address Type" />
                    </div>
                    <div className="flex items-center gap-30">
                      <div className="flex items-center gap-2">
                        <Radio
                          id="membership"
                          name="membership"
                          value="free"
                          defaultChecked
                        />
                        <Label htmlFor="united-state">
                          Home (All day delivery)
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio
                          id="paid"
                          name="membership"
                          value="paid"
                          defaultChecked
                        />
                        <Label htmlFor="united-state">
                          {" "}
                          Office (Delivery between 10 AM - 5 PM)
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-lg font-semibold">
                Delivery Options
              </Accordion.Title>
              <Accordion.Content>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <Radio
                      id="delivery"
                      name="parcel"
                      value="standard"
                      defaultChecked
                    />
                    <Label htmlFor="standard">Standard 3-5 Days</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="delivery"
                      name="parcel"
                      value="express"
                      defaultChecked
                    />
                    <Label htmlFor="express">Express</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="delivery"
                      name="parcel"
                      value="overnight"
                      defaultChecked
                    />
                    <Label htmlFor="overnight">Overnight</Label>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title className="text-lg font-semibold">
                Payment Method
              </Accordion.Title>
              <Accordion.Content>
                <div className="flex items-center gap-5 py-[1.875rem]">
                  <div className="flex items-center gap-2">
                    <Radio
                      id="cardpayment"
                      name="payment"
                      value="Credit/Debit/ATM Card"
                      defaultChecked
                    />
                    <Label htmlFor="payment">Credit/Debit/ATM Card</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio
                      id="cardpayment"
                      name="payment"
                      value="cashondeliver"
                      defaultChecked
                    />
                    <Label htmlFor="payment"> Cash on Delivery</Label>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-30">
                  <div className="lg:col-span-7 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="cardnumber" value="Card Number" />
                    </div>
                    <div className="col-span-9">
                      <TextInput
                        id="cardnumber"
                        type="number"
                        placeholder="1250 4521 5630 2390"
                        sizing="md"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-7 col-span-12 grid grid-cols-9 gap-30">
                    <div className="lg:col-span-5 col-span-12">
                      <div className="mb-2">
                        <Label htmlFor="name" value="Name" />
                      </div>
                      <div className="">
                        <TextInput
                          id="name"
                          type="text"
                          placeholder="Name"
                          sizing="md"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-2 col-span-12">
                      <div className="mb-2">
                        <Label htmlFor="expiredate" value="Exp.Date" />
                      </div>
                      <div className="">
                        <TextInput
                          id="expiredate"
                          type="number"
                          placeholder="MM/YY"
                          sizing="md"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-2 col-span-12">
                      <div className="mb-2">
                        <Label htmlFor="cvvnumber" value="CVV Code" />
                      </div>
                      <div className="">
                        <TextInput
                          id="cvvnumber"
                          type="number"
                          placeholder="528"
                          sizing="md"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-7 col-span-12 flex items-center gap-4">
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                    <Button type="reset" color="error">
                      Cancel
                    </Button>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </TitleCard>
    </div>
  );
};

export default CollapsibleSection;
