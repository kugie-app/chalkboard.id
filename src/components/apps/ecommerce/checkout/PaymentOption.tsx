import OutlineCard from "@/components/shared/OutlineCard";
import { Label, Radio } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import paypal from "/public/images/svgs/paypal.svg";
import master from "/public/images/svgs/mastercard.svg";
import payment from "/public/images/backgrounds/payment.svg";
const PaymentOption = () => {
  const [selectedPayment, setSelectedPayment] = useState('payment');


  const handlePaymentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedPayment(event.target.value);
  };
  return (
    <>
      <OutlineCard className="mt-[30px]">
        <h6 className="text-base mb-2">Payment Option</h6>
        <div className="grid grid-cols-12 gap-[30px]">
          <div className="lg:col-span-8 col-span-12">
            <div className="flex flex-col gap-4">
              <div className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${selectedPayment == 'payment' ? 'bg-lightprimary border-primary' : ''}`}>
                <div className="flex items-center gap-4 sm:ps-2">
                  <Radio
                    id="paypal"
                    name="payment"
                    value="payment"
                    className="cursor-pointer"
                    defaultChecked
                    onChange={handlePaymentChange}
                    checked={selectedPayment === 'payment'}
                  />
                  <div className="">
                    <Label
                      htmlFor="paypal"
                      className="cursor-pointer text-ld font-semibold text-base"
                    >
                      Pay with Paypal
                    </Label>
                    <p className="text-sm font-medium text-darklink dark:text-bodytext">
                      You will be redirected to PayPal website to complete your
                      purchase securely.
                    </p>
                  </div>
                  <Image src={paypal} alt="payment-icon" />
                </div>
              </div>
              <div className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${selectedPayment == 'Credit' ? 'bg-lightprimary border-primary' : ''}`}>
                <div className="flex items-center gap-4 sm:ps-2">
                  <Radio
                    id="master"
                    name="payment"
                    value="Credit"
                    className="cursor-pointer"

                    onChange={handlePaymentChange}
                    checked={selectedPayment === 'Credit'}
                  />
                  <div className="grow">
                    <Label
                      htmlFor="master"
                      className="cursor-pointer text-ld font-semibold text-base"
                    >
                      Credit / Debit Card
                    </Label>
                    <p className="text-sm font-medium text-darklink dark:text-bodytext">
                      We support Mastercard, Visa, Discover and Stripe.
                    </p>
                  </div>
                  <Image src={master} alt="payment-icon" />
                </div>
              </div>
              <div className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${selectedPayment == 'Cash' ? 'bg-lightprimary border-primary' : ''}`}>
                <div className="flex items-center gap-4 sm:ps-2">
                  <Radio
                    id="cash"
                    name="payment"
                    value="Cash"
                    className="cursor-pointer"
                    onChange={handlePaymentChange}
                    checked={selectedPayment === 'Cash'}
                  />
                  <div className="grow">
                    <Label
                      htmlFor="cash"
                      className="cursor-pointer text-ld font-semibold text-base"
                    >
                      Cash on Delivery
                    </Label>
                    <p className="text-sm font-medium text-darklink dark:text-bodytext">
                      Pay with cash when your order is delivered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="mx-auto">
              <Image src={payment} alt="payment" className="w-full" />
            </div>
          </div>
        </div>
      </OutlineCard>
    </>
  );
};

export default PaymentOption;
