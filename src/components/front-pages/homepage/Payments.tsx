import visa from "/public/images/front-pages/payments/visa.svg";
import mastercard from "/public/images/front-pages/payments/master.svg";
import express from "/public/images/front-pages/payments/american-exp.svg";
import discover from "/public/images/front-pages/payments/discover.svg";
import paypal from "/public/images/front-pages/payments/paypal.svg";
import maaestro from "/public/images/front-pages/payments/maesro.svg";
import jcb from "/public/images/front-pages/payments/jcb.svg";
import dinners from "/public/images/front-pages/payments/dinners-clb.svg";
import Image from "next/image";

export const PaymentOptions = () => {
  const paymentOptions = [
    {
      key: "option1",
      img: visa,
    },
    {
      key: "option2",
      img: mastercard,
    },
    {
      key: "option3",
      img: express,
    },
    {
      key: "option4",
      img: discover,
    },
    {
      key: "option5",
      img: paypal,
    },
    {
      key: "option6",
      img: maaestro,
    },
    {
      key: "option7",
      img: jcb,
    },
    {
      key: "option8",
      img: dinners,
    },
  ];
  return (
    <>
      <div className="px-4 pt-12 dark:bg-dark">
        <p className="text-base text-ld opacity-90 text-center mb-8">
          Secured payment with PayPal & Razorpay
        </p>
        <div className="flex flex-wrap items-center justify-center md:gap-14 gap-7">
          {paymentOptions.map((item) => {
            return <Image key={item.key} src={item.img} alt="payment" />;
          })}
        </div>
      </div>
    </>
  );
};
