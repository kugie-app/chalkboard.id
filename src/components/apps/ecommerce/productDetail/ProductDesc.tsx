"use client";
import OutlineCard from "@/components/shared/OutlineCard";
import { Icon } from "@iconify/react";
import { Button, Progress, Rating, Tabs } from "flowbite-react";
import React from "react";
const ProductDesc = () => {
  return (
    <>
      <Tabs aria-label="Tabs with underline" variant="underline">
        <Tabs.Item active title="Discription">
          <div className="py-4">
            <h5 className="text-lg mb-6">
              Sed at diam elit. Vivamus tortor odio, pellentesque eu tincidunt
              a, aliquet sit amet lorem pellentesque eu tincidunt a, aliquet sit
              amet lorem.
            </h5>
            <p className="text-sm text-darklink dark:text-bodytext mb-6">
              Cras eget elit semper, congue sapien id, pellentesque diam. Nulla
              faucibus diam nec fermentum ullamcorper. Praesent sed ipsum ut
              augue vestibulum malesuada. Duis vitae volutpat odio. Integer sit
              amet elit ac justo sagittis dignissim.
            </p>
            <p className="text-sm text-darklink dark:text-bodytext">
              Cras eget elit semper, congue sapien id, pellentesque diam. Nulla
              faucibus diam nec fermentum ullamcorper. Praesent sed ipsum ut
              augue vestibulum malesuada. Duis vitae volutpat odio. Integer sit
              amet elit ac justo sagittis dignissim.
            </p>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Reviews">
          <div className="py-4">
            <div className="grid grid-cols-12 gap-5">
              <div className="lg:col-span-4 col-span-12 flex items-stretch">
                <OutlineCard className="shadow-none">
                  <div className="flex flex-col justify-center items-center py-5">
                    <h6 className="text-sm">Average Rating</h6>
                    <h2 className="text-4xl text-primary my-3">4/5</h2>
                    <Rating size={"cs"}>
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                      <Rating.Star filled={false} />
                    </Rating>
                  </div>
                </OutlineCard>
              </div>
              <div className="lg:col-span-4 col-span-12 flex items-stretch">
                <OutlineCard className="shadow-none">
                  <div className="flex flex-col gap-3 ">
                    <div className="flex items-center gap-5">
                      <span className="text-darklink dark:text-bodytext text-xs">1 Stars</span>
                      <div className="grow ">
                        <Progress progress={45} color={"primary"} size={"sm"} />
                      </div>
                      <span className="text-ld font-semibold text-sm">
                        (485)
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-darklink dark:text-bodytext text-xs">2 Stars</span>
                      <div className="grow ">
                        <Progress progress={30} color={"primary"} size={"sm"} />
                      </div>
                      <span className="text-ld font-semibold text-sm">
                        (215)
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-darklink dark:text-bodytext text-xs">3 Stars</span>
                      <div className="grow ">
                        <Progress progress={25} color={"primary"} size={"sm"} />
                      </div>
                      <span className="text-ld font-semibold text-sm">
                        (110)
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-darklink dark:text-bodytext text-xs">4 Stars</span>
                      <div className="grow ">
                        <Progress progress={80} color={"primary"} size={"sm"} />
                      </div>
                      <span className="text-ld font-semibold text-sm">
                        (620)
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="text-darklink dark:text-bodytext text-xs">5 Stars</span>
                      <div className="grow ">
                        <Progress progress={20} color={"primary"} size={"sm"} />
                      </div>
                      <span className="text-ld font-semibold text-sm">
                        (160)
                      </span>
                    </div>
                  </div>
                </OutlineCard>
              </div>
              <div className="lg:col-span-4 col-span-12 flex items-stretch">
                <OutlineCard className="shadow-none">
                  <div className="flex flex-col justify-center items-center py-5">
                    <Button
                      color={"outlineprimary"}
                      size={"md"}
                      className="w-fit flex items-center"
                    >
                      <Icon icon="solar:pen-2-outline" height={22} /> write an review
                    </Button>
                  </div>
                </OutlineCard>
              </div>
            </div>
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default ProductDesc;
