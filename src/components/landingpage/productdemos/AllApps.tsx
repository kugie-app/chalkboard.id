import React from "react";
import * as DemosName from "../Data";
import { Button } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
const AllApps = () => {
  return (
    <>
      {/* Demos */}
      <div className="grid grid-cols-12 gap-[30px]">
        {DemosName.Demos.map((item, index) => (
          <React.Fragment key={index}>
            {item.type != true ? (
              <div
                className="lg:col-span-4 md:col-span-6 col-span-12 "
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <div className="relative overflow-hidden rounded-md border border-ld ">
                  <div className="overflow-hidden rounded-md rounded-b-none relative flex justify-center items-center group ">
                    <Image src={item.img} alt="MatDash" className="w-full" />
                  </div>

                  <div className="rounded-t-none rounded-md p-4 flex justify-between items-center">
                    <div>
                      <Link
                        href={item.link}
                        className="text-base text-dark dark:text-white hover:text-primary font-semibold "
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs mt-1">Application</p>
                    </div>
                    <Button
                      as={Link}
                      href={item.link}
                      color={"primary"}
                      className="text-xs"
                      size={"xs"}
                    >
                      Live Preview
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default AllApps;
