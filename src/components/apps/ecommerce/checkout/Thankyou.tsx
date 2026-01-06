import React from "react";
import payment from "/public/images/backgrounds/payment.svg";
import Image from "next/image";
import { Button } from "flowbite-react";
const Thankyou = () => {
  return (
    <>
      <div className="text-center mx-auto">
        <h5 className="text-lg">Thank you for your purchase!</h5>
        <p className="text-primary text-sm font-semibold">
          Your order id: 3fa7-69e1-79b4-dbe0d35f5f5d
        </p>
        <Image
          src={payment}
          width={350}
          alt="payment"
          className="mx-auto my-5"
        />
        <p className="text-xs text-darklink dark:text-bodytext">
          We will send you a notification
          <br />
          within 2 days when it ships.
        </p>
      </div>
      <div className="sm:flex justify-between mt-6">
        <Button color={'success'} className="sm:mb-0 mb-4 sm:w-fit w-full rounded-xl" href="/apps/ecommerce/shop">Continue Shopping</Button>
        <Button color={'primary'} className="sm:mb-0  sm:w-fit  w-full rounded-xl">Download Receipt</Button>
      </div>
    </>
  );
};

export default Thankyou;
