import OutlineCard from "@/components/shared/OutlineCard";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import { Button } from "flowbite-react";
import DeliveryOption from "./DeliveryOption";
import PaymentOption from "./PaymentOption";

const BillsAddress = ({ Discount, total }: any) => {
  const [isVisibleAddress, setIsVisibleAddress] = useState(false);

  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisibleAddress(!isVisibleAddress);
  };
  return (
    <>
      {!isVisibleAddress ? (
        <>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <OutlineCard className="shadow-none rounded-xl">
                <h5 className="text-base">Johnathan Doe</h5>
                <p className="text-xs text-darklink dark:text-bodytext my-3">
                  E601 Vrundavan Heights, godrej garden city - 382481
                </p>
                <h6 className="flex gap-2 items-center text-base mb-4">
                  <Icon icon="solar:speaker-minimalistic-broken" height={25} />
                  9999501050
                </h6>
                <Button
                  color={"outlineprimary"}
                  className="w-fit  rounded-xl"
                  onClick={toggleVisibility}
                >
                  Deliver To this address
                </Button>
              </OutlineCard>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <OutlineCard className="shadow-none rounded-xl">
                <h5 className="text-base">ParleG Doe</h5>
                <p className="text-xs text-darklink dark:text-bodytext my-3">
                  D201 Galexy Heights, godrej garden city - 382481
                </p>
                <h6 className="flex gap-2 items-center text-base mb-4">
                  <Icon icon="solar:speaker-minimalistic-broken" height={25} />
                  9999501050
                </h6>
                <Button
                  color={"outlineprimary"}
                  className="w-fit rounded-xl"
                  onClick={toggleVisibility}
                >
                  Deliver To this address
                </Button>
              </OutlineCard>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <OutlineCard className="shadow-none rounded-xl">
                <h5 className="text-base">Guddu Bhaiya</h5>
                <p className="text-xs text-darklink dark:text-bodytext my-3">
                  Mumbai khao gali, Behind shukan, godrej garden city - 382481
                </p>
                <h6 className="flex gap-2 items-center text-base mb-4">
                  <Icon icon="solar:speaker-minimalistic-broken" height={25} />
                  9999501050
                </h6>
                <Button
                  color={"outlineprimary"}
                  className="w-fit  rounded-xl"
                  onClick={toggleVisibility}
                >
                  Deliver To this address
                </Button>
              </OutlineCard>
            </div>
          </div>
        </>
      ) : null}

      {/* Delivery Payment Options */}
      {isVisibleAddress && (
        <>
          <DeliveryOption />
          <PaymentOption />
        </>
      )}
      {/* Order Summery */}
      <OrderSummary Discount={Discount} total={total} />
    </>
  );
};

export default BillsAddress;
