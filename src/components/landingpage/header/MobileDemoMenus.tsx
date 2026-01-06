"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { demosMegamenu, appsMegamenu, FrontMenu } from "../Data";
import { Button } from "flowbite-react";
import { Accordion } from "flowbite-react";
import * as AppsData from "@/components/layout/vertical/header/Data";
const MobileDemosMenu = () => {
  return (
    <>
      <Accordion collapseAll className="shadow-none mt-4 divide-none">
        <Accordion.Panel>
          <Accordion.Title className="py-3 px-0">Demos</Accordion.Title>
          <Accordion.Content className="px-0 py-3">
            <div className="p-0">
              <div className="mb-5">
                <h5 className="card-title">Different Demos</h5>
                <p>Included with the Package</p>
              </div>
              <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
                {demosMegamenu.map((item, index) => (
                  <div key={index}>
                    <div className="overflow-hidden border border-ld rounded-md relative flex justify-center items-center group ">
                      <Image src={item.img} alt="matdash" className="w-full" />
                      {item.link != "" ? (
                        <>
                          <Button
                            as={Link}
                            href={item.link}
                            color={"primary"}
                            size={"sm"}
                            className="text-xs absolute  left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-[1]"
                          >
                            Live Preview
                          </Button>
                          <div className="absolute top-0 bottom-0 left-0 h-full w-full bg-blue-100  mix-blend-multiply invisible group-hover:visible"></div>
                        </>
                      ) : null}
                    </div>
                    <h5 className="text-center p-3 text-sm font-semibold">
                      {item.name}
                    </h5>
                    {item.include == "Included With The package" ? (
                      <p className="text-xs text-center text-bodytext">
                        Included With The package
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h5 className="card-title mb-5">Different Apps</h5>
                <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
                  {appsMegamenu.map((item, index) => (
                    <div key={index}>
                      <div className="overflow-hidden border border-ld rounded-md relative flex justify-center items-center group ">
                        <Image
                          src={item.img}
                          alt="matdash"
                          className="w-full"
                        />
                        <Button
                          as={Link}
                          href={item.link}
                          color={"primary"}
                          size={"sm"}
                          className="text-xs  absolute  left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-[1]"
                        >
                          Live Preview
                        </Button>
                        <div className="absolute top-0 bottom-0 left-0 h-full w-full bg-blue-100  mix-blend-multiply invisible group-hover:visible"></div>
                      </div>
                      <h5 className="text-center p-3 text-sm font-semibold">
                        {item.name}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title className="py-3 px-0">
            Frontend Pages
          </Accordion.Title>
          <Accordion.Content className="px-0 py-3">
            <div className="p-0">
              <div className="mb-5">
                <h5 className="card-title">Different Front Pages</h5>
                <p>Included with the Package</p>
              </div>
              <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
                {FrontMenu.map((item, index) => (
                  <div key={index}>
                    <div className="overflow-hidden border border-ld rounded-md relative flex justify-center items-center group ">
                      <Image src={item.img} alt="matdash" className="w-full" />
                      {item.link != "" ? (
                        <>
                          <Button
                            as={Link}
                            href={item.link}
                            color={"primary"}
                            size={"sm"}
                            className="text-xs absolute  left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-[1]"
                          >
                            Live Preview
                          </Button>
                          <div className="absolute top-0 bottom-0 left-0 h-full w-full bg-blue-100  mix-blend-multiply invisible group-hover:visible"></div>
                        </>
                      ) : null}
                    </div>
                    <h5 className="text-center p-3 text-sm font-semibold">
                      {item.name}
                    </h5>
                    {item.include == "Included With The package" ? (
                      <p className="text-xs text-center text-bodytext">
                        Included With The package
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title className="py-3 px-0">Pages</Accordion.Title>
          <Accordion.Content className="px-0 py-3">
            <div className="grid grid-cols-12 gap-3 w-full">
              {AppsData.appsLink.map((links, index) => (
                <div className="col-span-12 xl:col-span-6 " key={index}>
                  <Link
                    href={links.href}
                    className="flex gap-3 hover:text-primary group relative items-center"
                  >
                    <span
                      className={`h-12 w-12 flex justify-center items-center rounded-tw ${links.iconbg}`}
                    >
                      <Icon
                        icon={links.icon}
                        height={24}
                        className={`${links.iconcolor}`}
                      />
                    </span>
                    <div>
                      <h6 className="font-semibold text-15 text-ld hover:text-primary ">
                        {links.title}
                      </h6>
                      <p className="text-13 text-bodytext">{links.subtext}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
};

export default MobileDemosMenu;
