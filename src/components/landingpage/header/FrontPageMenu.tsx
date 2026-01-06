"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FrontMenu } from "../Data";
import { IconChevronDown } from "@tabler/icons-react";
import { Button, Dropdown } from "flowbite-react";

const FrontPageMenu = () => {
  return (
    <>
      <div className="relative group/menu">
        <Dropdown
          label=""
          className="w-screen  xl:w-[1150px]  rounded-sm"
          dismissOnClick={false}
          renderTrigger={() => (
            <div className="relative">
              <span className="py-1.5 px-4 text-base text-ld hover:text-primary hover:bg-lightprimary rounded-md flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
                Frontend Pages <IconChevronDown className="ms-1" size={15} />
              </span>
            </div>
          )}
        >
          <div className="xl:p-6 p-3">
            <div className="mb-5">
              <h5 className="card-title">Different Front Pages</h5>
              <p>Included with the Package</p>
            </div>
            <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
              {FrontMenu.slice(0,5).map((item, index) => (
                <div key={index}>
                  <div className="overflow-hidden border border-ld rounded-md relative flex justify-center items-center group ">
                    <Image src={item.img} alt="matdash" className="w-full" />
                    {item.include == "Included With The package" ? null : (
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
                    )}
                  </div>
                  <h5 className="text-center p-3  pb-0 text-sm font-semibold">
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
        </Dropdown>
      </div>
    </>
  );
};

export default FrontPageMenu;
