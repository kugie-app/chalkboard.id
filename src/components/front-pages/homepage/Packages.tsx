"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge, Button } from "flowbite-react";
export const Packages = () => {
  const Licenses = [
    {
      key: "license1",
      licenseType: "Single Use",
      licenseDesc:
        "Use for single end product which end users can’t be charged for.",
      price: "$49",
      isSaasUse: false,
      feature: "One Project",
      isPopular: false,
    },
    {
      key: "license2",
      licenseType: "Multiple Use",
      licenseDesc:
        "Use for unlimited end products end users can’t be charged for.",
      price: "$89",
      isSaasUse: false,
      feature: "Unlimited Project",
      isPopular: false,
    },
    {
      key: "license3",
      licenseType: "Extended Use",
      licenseDesc:
        "Use for single end product which end users can be charged for.",
      price: "$299",
      isSaasUse: true,
      feature: "One Project",
      isPopular: true,
    },
    {
      key: "license4",
      licenseType: "Unlimited Use",
      licenseDesc:
        "Use in unlimited end products end users can be charged for.",
      price: "$499",
      isSaasUse: true,
      feature: "Unlimited Project",
      isPopular: false,
    },
  ];
  return (
    <>
      <div className="dark:bg-dark">
        <div className="container-1218 mx-auto lg:pt-24 pt-12">
          <div className="flex w-full justify-center mb-12">
            <div className="text-center">
              <h2 className="sm:text-44 text-3xl font-bold !leading-[48px] text-darklink dark:text-white text-center">
                Fair pricing for everyone.
              </h2>
              <p className="text-17 leading-[32px] pt-4 text-ld opacity-80">
                Our robust analytics offer rich insights into the information
                buyers want, informing where teams.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {Licenses.map((item,index) => {
              return (
                <div className="xl:col-span-3 md:col-span-6 col-span-12" key={index}>
                  <div className="p-6 rounded-tw border border border-ld">
                    <div className="pb-8">
                      <h6 className="text-xl font-semibold text-ld mb-4 flex items-center gap-2">
                        {item.licenseType}
                        {item.isPopular ? (
                          <Badge
                            color={"lightprimary"}
                            className="text-xs font-bold rounded-full"
                            size={"small"}
                          >
                            Popular
                          </Badge>
                        ) : null}
                      </h6>
                      <p className="text-ld opacity-90 leading-[24px] text-sm ">
                        {item.licenseDesc}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="text-40 leading-tight font-bold text-primary">
                        {item.price}
                      </div>
                      <p className="text-base self-end text-ld opacity-90 relative -top-1">
                        / one time pay
                      </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3.5">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="tabler:circle-check"
                          className="text-xl text-secondary"
                        />
                        <p className="text-15 text-ld font-medium tracking-wide">
                          Full source code
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="tabler:circle-check"
                          className="text-xl text-secondary"
                        />
                        <p className="text-15 text-ld font-medium tracking-wide">
                          Documentation
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isSaasUse ? (
                          <>
                            <Icon
                              icon="tabler:circle-check"
                              className="text-xl text-secondary dark:text-dar-secondary "
                            />
                            <p className="text-15 text-ld font-medium tracking-wide">
                              Use in SaaS app
                            </p>
                          </>
                        ) : (
                          <>
                            <Icon
                              icon="tabler:circle-x"
                              className="text-xl text-error"
                            />
                            <p className="text-15 text-ld font-medium tracking-wide opacity-90">
                              Use in SaaS app
                            </p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-15 text-ld font-medium tracking-wide">
                          {item.feature === "One Project" ? (
                            <>
                              <span className="font-bold">One</span> Project
                            </>
                          ) : (
                            <>
                              <span className="font-bold">Unlimited</span>{" "}
                              Project
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-15 text-ld font-medium tracking-wide">
                          <span className="font-bold">One Year</span> Technical
                          Support
                        </p>
                      </div>
                     
                    </div>
                    <div className="mt-8">
                      <Button
                        color={"sky"}
                        size={"lg"}
                        className="text-lg py-0 font-medium rounded-md w-full"
                      >
                        Purchase Now
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
