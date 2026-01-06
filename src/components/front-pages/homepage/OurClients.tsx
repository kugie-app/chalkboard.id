"use client";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
const Feature = [
  {
    icon: "tabler:chart-bubble",
    title: "Expert Advisor",
    subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
    bgcolor: "bg-lighterror",
    color: "text-error",
  },
  {
    icon: "tabler:building-store",
    title: "Effective Support",
    subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
    bgcolor: "bg-lightprimary",
    color: "text-primary",
  },
  {
    icon: "material-symbols:category-outline",
    title: "Low Fees",
    subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
    bgcolor: "bg-lightsuccess",
    color: "text-success",
  },
  {
    icon: "material-symbols:earthquake",
    title: "Loan Facility",
    subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
    bgcolor: "bg-lightgray dark:bg-darkgray",
    color: "text-dark dark:text-white",
  },
];

const OurClients = () => {
  return (
    <>
      <div className="lg:py-24 py-12 dark:bg-dark">
        <div className="container-1218 mx-auto">
          <div className="grid grid-cols-12 gap-30">
            <div className="lg:col-span-5 col-span-12">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white">
                Over 45,000 clients and counting.
              </h2>
              <p className="text-17 leading-[32px] text-ld opacity-80 py-6">
                Pellentesque varius semper odio non pretium. Nullam sagittis
                neque orci, eu elementum enim.
              </p>
              <Link
                href={"/"}
                className="text-darklink dark:text-white text-15 font-bold underline decoration-2 underline-offset-[6px] text-primary-ld"
              >
                Request a Callback
              </Link>
            </div>
            <div className="lg:col-span-7 col-span-12 lg:ps-5 ">
              <div className="grid grid-cols-12 md:gap-12 gap-6">
                {Feature.map((item, index) => (
                  <div className="md:col-span-6 col-span-12" key={index}>
                    <div
                      className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-tw ${item.bgcolor}`}
                    >
                      <Icon
                    icon={item.icon}
                    className={`${item.color}`}
                    height={24}
                  />
                    </div>
                    <h4 className="font-bold text-darklink dark:text-white py-5 text-22">
                      {item.title}
                    </h4>
                    <p className="text-15 text-ld opacity-80 md:pt-2 leading-6">
                      {item.subtitle}
                    </p>
                  </div>
                ))}
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurClients;
