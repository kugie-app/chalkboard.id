"use client";
import React, { useState } from "react";
import CardBox from "@/components/shared/CardBox";
import { Label, Radio, RangeSlider, Select, TextInput } from "flowbite-react";

const Pricing = () => {

  const [discountType, setDiscountType] = useState("no-discount");

  const handleRadioChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setDiscountType(event.target.value);
  };

  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">Pricing</h5>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="prednm" value="Base Price" />
            <span className="text-error ms-1">*</span>
          </div>
          <TextInput
            id="prednm"
            type="text"
            sizing="md"
            className="form-control"
            placeholder="Product Price"
          />
          <small className="text-xs text-darklink dark:text-bodytext">
            Set the product price.
          </small>
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="disctype" value="Discount Type" />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <div className="border border-ld p-4 rounded-xl hover:border-primary hover:bg-lightprimary cursor-pointer">
                <div className="flex items-center gap-4 sm:ps-2 ">
                  <Radio
                    id="no-discount"
                    name="discount"
                    value="no-discount"
                    className="cursor-pointer"
                    checked={discountType === "no-discount"}
                    onChange={handleRadioChange}
                  />
                  <div className="">
                    <Label
                      htmlFor="no-discount"
                      className="cursor-pointer text-ld font-semibold text-base"
                    >
                      No Discount
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="border border-ld p-4 rounded-xl hover:border-primary hover:bg-lightprimary cursor-pointer">
                <div className="flex items-center gap-4 sm:ps-2">
                  <Radio
                    id="percentages"
                    name="discount"
                    value="percentage"
                    className="cursor-pointer"
                    checked={discountType === "percentage"}
                    onChange={handleRadioChange}
                  />
                  <div className="">
                    <Label
                      htmlFor="percentages"
                      className="cursor-pointer text-ld font-semibold text-base"
                    >
                      Percentage %
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="border border-ld p-4 rounded-xl hover:border-primary hover:bg-lightprimary cursor-pointer">
                <div className="flex items-center gap-4 sm:ps-2">
                  <Radio
                    id="fixed-price"
                    name="discount"
                    value="fixed-price"
                    className="cursor-pointer"
                    checked={discountType === "fixed-price"}
                    onChange={handleRadioChange}
                  />
                  <div className="">
                    <Label
                      htmlFor="fixed-price"
                      className="cursor-pointer text-ld font-semibold text-base"
                    >
                      Fixed Price
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {discountType === "percentage" && (
            <div className="col-span-12 my-6">
              <div>
                <div className="mb-1 block">
                  <Label
                    htmlFor="default-range"
                    value="Set Discount Percentage"
                  />
                </div>
                <RangeSlider id="default-range" />
              </div>
              <small className="text-xs text-darklink dark:text-bodytext">
                Set a percentage discount to be applied on this product.
              </small>
            </div>
          )}

          {discountType === "fixed-price" && (
            <div className="col-span-12 my-6">
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="dis" value="Fixed Discounted Price" />
                  <span className="text-error ms-1">*</span>
                </div>
                <TextInput
                  id="dis"
                  type="text"
                  sizing="md"
                  className="form-control"
                  placeholder="Discounted Price"
                />
                <small className="text-xs text-darklink dark:text-bodytext">
                  Set the discounted product price. The product will be reduced
                  at the determined fixed price.
                </small>
              </div>
            </div>
          )}

          <div className="grid grid-cols-12 gap-6 mt-8">
            <div className="lg:col-span-6 col-span-12">
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="tax" value="Tax Class" />
                  <span className="text-error ms-1">*</span>
                </div>


                <Select id="countries" className="select-md" required>
                  <option selected>Select an option</option>
                  <option>Tax Free</option>
                  <option>Taxable Goods</option>
                  <option>Downloadable Products</option>
                </Select>
                <small className="text-xs text-darklink dark:text-bodytext">
                  Set the product tax class.
                </small>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12">
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="vat" value="VAT Amount (%) " />
                  <span className="text-error ms-1">*</span>
                </div>
                <TextInput
                  id="vat"
                  type="text"
                  sizing="md"
                  className="form-control"
                />
                <small className="text-xs text-darklink dark:text-bodytext">
                  Set the product VAT amount.
                </small>
              </div>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default Pricing;

