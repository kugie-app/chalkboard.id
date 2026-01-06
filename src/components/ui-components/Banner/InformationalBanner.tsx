import { Banner } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { FaBookOpen } from "react-icons/fa";
import { HiX, HiArrowRight } from "react-icons/hi";
const InformationalBanner = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Informational Banner</h4>
        <Banner>
          <div className="flex w-full flex-col justify-between rounded-md border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                Integration is the key
              </h2>
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                You can integrate Flowbite with many tools to make your work
                even more efficient and lightning fast based on Tailwind CSS.
              </p>
            </div>
            <div className="flex shrink-0 items-center">
              <a
                href="#"
                className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <FaBookOpen className="mr-2 h-4 w-4" />
                Learn more
              </a>
              <a
                href="#"
                className="mr-2 inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primaryemphasis focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-primary dark:hover:bg-primary dark:focus:ring-cyan-800"
              >
                Get started
                <HiArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Banner.CollapseButton
                color="gray"
                className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
              >
                <HiX className="h-4 w-4" />
              </Banner.CollapseButton>
            </div>
          </div>
        </Banner>
      </CardBox>
    </div>
  );
};

export default InformationalBanner;
