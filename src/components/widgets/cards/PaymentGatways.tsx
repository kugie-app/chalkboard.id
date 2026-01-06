"use client";
import React from "react";
import CardBox from "../../shared/CardBox";
import { Button, Dropdown } from "flowbite-react";
import { IconDotsVertical } from "@tabler/icons-react";

import icon1 from "/public/images/svgs/icon-paypal.svg";
import icon2 from "/public/images/svgs/icon-office-bag.svg";
import icon3 from "/public/images/svgs/icon-master-card.svg";
import icon4 from "/public/images/svgs/icon-money.svg";
import icon5 from "/public/images/svgs/icon-pie.svg";
import Image from "next/image";

const PaymentGateway = () => {
  const RecentTransData = [
    {
      img: icon1,
      title: "PayPal Transfer",
      subtitle: "Money added",
      rank: "+$6,235",
      disable: "",
      bgcolor: "secondary",
    },
    {
      img: icon2,
      title: "Wallet",
      subtitle: "Bill payment",
      rank: "+$345",
      disable: "opacity-80",
      bgcolor: "success",
    },
    {
      img: icon3,
      title: "Credit Card",
      subtitle: "Money reversed",
      rank: "+$2,235",
      disable: "",
      bgcolor: "warning",
    },
    {
      img: icon5,
      title: "Refund",
      subtitle: "Bill Payment",
      rank: "-$32",
      disable: "opacity-80",
      bgcolor: "error",
    },
  ];
  return (
    <>
      <CardBox>
        <div>
          <h5 className="card-title">Recent Transactions</h5>
          <p className="card-subtitle">Platform for Income</p>
        </div>
        <div className="mt-7 flex flex-col gap-6">
          {RecentTransData.map((item, index) => (
            <div className="flex gap-3.5 items-center" key={index}>
              <div
                className={`h-11 w-11 rounded-md flex justify-center items-center bg-light${item.bgcolor} dark:bg-dark${item.bgcolor}`}
              >
                <Image src={item.img} alt="icon" className="h-6 w-6" />
              </div>
              <div>
                <h5 className="text-base">{item.title}</h5>
                <p className="text-sm text-bodytext">{item.subtitle}</p>
              </div>
              <div
                className={`ms-auto font-medium text-dark dark:text-white ${item.disable}`}
              >
                {item.rank}
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <Button color={"primary"} className="w-full mt-7">
            View All Transactions
          </Button>
        </div>
      </CardBox>
    </>
  );
};

export default PaymentGateway;
