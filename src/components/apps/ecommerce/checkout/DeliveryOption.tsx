import OutlineCard from "@/components/shared/OutlineCard";
import { Label, Radio } from "flowbite-react";
import React, { useState } from "react";

const DeliveryOption = () => {

  const [selectedDelivery, setSelectedDelivery] = useState('delivery-free');

  const handleDeliveryChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedDelivery(event.target.value);
  };
  return (
    <>
      <OutlineCard className="shadow-none">
        <h6 className="text-base mb-2">Delivery Option </h6>
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-6 col-span-12">
            <div className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${selectedDelivery === 'delivery-free' ? 'bg-lightprimary border-primary' : ''}`}>
              <div className="flex items-center gap-4 sm:ps-2">
                <Radio
                  id="free"
                  name="delivery"
                  value="delivery-free"
                  className="cursor-pointer"
                  defaultChecked
                  onChange={handleDeliveryChange}
                  checked={selectedDelivery === 'delivery-free'}
                />
                <div className="">

                  <Label
                    htmlFor="free"
                    className="cursor-pointer text-ld font-semibold text-base"
                  >
                    Free Delivery
                  </Label>
                  <p className="text-sm font-medium text-darklink dark:text-bodytext">
                    Delivered on Firday, May 10
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${selectedDelivery === 'delivery-fast' ? 'bg-lightprimary border-primary' : ''}`}>
              <div className="flex items-center gap-4  sm:ps-2">
                <Radio
                  id="fast"
                  name="delivery"
                  value="delivery-fast"
                  className="cursor-pointer"
                  checked={selectedDelivery === 'delivery-fast'}
                  onChange={handleDeliveryChange}
                />

                <div className="">
                  <Label
                    htmlFor="fast"
                    className="cursor-pointer text-ld font-semibold text-base"
                  >
                    Free Delivery
                  </Label>
                  <p className="text-sm font-medium text-darklink dark:text-bodytext">
                    Delivered on Wednesday, May 8
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OutlineCard >
    </>
  );
};

export default DeliveryOption;
