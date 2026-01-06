"use client";
import "flowbite";
import { Button } from "flowbite-react";
import React, { useState, useContext } from "react";
import ProductCart from "./ProductCart";
import BillsAddress from "./BillsAddress";
import Thankyou from "./Thankyou";
import { ProductContext } from '@/app/context/Ecommercecontext/index';
import { sum } from 'lodash';
import { ProductType } from '@/app/[locale]/(DashboardLayout)/types/apps/eCommerce';

const ProductCheckout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: React.SetStateAction<number>) => {
    setActiveTab(index);
  };
  const { cartItems } = useContext(ProductContext);
  const total: number = sum(cartItems.map((product: ProductType) => product.price * product.qty));
  const Discount: number = Math.round(total * (5 / 100));


  return (
    <>
      <div className="mx-auto w-full max-w-3xl sm:px-8">
        <ol className="flex items-center w-full justify-center my-4">
          <li
            className={`flex w-full justify-between items-center after:content-[''] after:w-full after:h-0.5 after:border-b  after:border-2 after:inline-block relative ${activeTab === 1 || activeTab == 2
              ? "after:border-primary  dark:after:border-primary"
              : "after:border-border dark:after:border-darkborder"
              }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${activeTab === 0 || activeTab == 1 || activeTab == 2
                ? "bg-primary text-white"
                : "bg-gray-500 text-white"
                }`}
            >
              1
            </span>
            <div className="absolute mx-auto text-center mt-14 left-0 rtl:right-0 rtl:left-[unset]" >
              Cart
            </div>
          </li>
          <li
            className={`flex w-full items-center after:content-[''] after:w-full after:h-[2px] after:border-b after:border-2 after:inline-block relative ${activeTab === 2
              ? "after:border-primary  dark:after:border-primary"
              : "after:border-border dark:after:border-darkborder"
              }`}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${activeTab === 1 || activeTab === 2
                ? "bg-primary text-white"
                : "bg-gray-500 text-white"
                }`}
            >
              2
            </span>
            <div className="absolute mx-auto text-center mt-14 -left-9 rtl:-right-10 rtl:left-[unset]">
              {" "}
              Billing & address
            </div>
          </li>
          <li className="flex items-center relative">
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${activeTab === 2
                ? "bg-primary text-white"
                : "bg-gray-500 text-white"
                }`}
            >
              3
            </span>
            <div className="absolute mx-auto text-center mt-14 -left-3 ">
              Payment
            </div>
          </li>
        </ol>
      </div>
      <div className="mt-10">
        {/* Cart Table */}
        {activeTab === 0 && (
          <div className="sm:px-8">
            <ProductCart Discount={Discount} total={total} />
          </div>
        )}

        {/* Billing Address */}
        {activeTab === 1 && (
          <div className="sm:px-8">
            <BillsAddress Discount={Discount} total={total} />
          </div>
        )}

        {/* Thank You */}
        {activeTab === 2 && (
          <div className="sm:px-8">
            <Thankyou />
          </div>
        )}

        <div className="flex justify-end gap-3 items-center sm:px-8 mt-6">
          <Button
            onClick={() => handleTabClick(0)}
            className={`activeTab === 0 ? "active bg-gray-500 " : "bg-gray-500"} rounded-xl`}
          >
            Previous
          </Button>
          {activeTab === 0 ? (
            <Button color={"primary"} onClick={() => handleTabClick(1)} className=" rounded-xl">
              Next
            </Button>
          ) : null}

          {activeTab === 1 || activeTab == 2 ? (
            <Button color={"primary"} onClick={() => handleTabClick(2)} className=" rounded-xl">
              {activeTab === 2 ? "submit" : "Next"}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default ProductCheckout;
