"use client";
import React from "react";
import { Icon } from "@iconify/react";
const Feature = [
  {
    icon: "tabler:building-store",
    title: "Effective Support",
    subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
    bgcolor: "bg-lightprimary",
    color: "text-primary",
  },
  {
    icon: "tabler:chart-bubble",
    title: "Expert Advisor",
    subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
    bgcolor: "bg-lighterror",
    color: "text-error",
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
    bgcolor: "bg-lightgray dark:bg-darkmuted",
    color: "text-dark dark:text-lightgray",
  },
];
const SetupProcess = () => {
  return (
    <>
      <div className="dark:bg-dark">
        <div className="container-1218 mx-auto lg:py-24 py-12">
          <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white text-center pb-12">
            The hassle-free setup process
          </h2>
          <div className="grid grid-cols-12 md:gap-30 gap-6">
            {Feature.map((item, index) => (
              <div
                className="xl:col-span-3 md:col-span-6 col-span-12"
                key={index}
              >
                <div className={`${item.bgcolor} p-30 rounded-tw`}>
                  <div
                    className={`h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-tw bg-white dark:bg-darkgray shadow-elevation4`}
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
                  <p className="text-15 text-ld opacity-80  leading-6">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupProcess;
