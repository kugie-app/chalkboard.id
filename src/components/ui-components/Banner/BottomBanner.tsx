import { Banner } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import { MdPercent } from "react-icons/md";
import { HiX, HiArrowRight } from "react-icons/hi";
import CodeModal from "../CodeModal";
const BottomBanner = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold ">Bottom Position</h4>
          <CodeModal>
            {`
        import { Banner } from "flowbite-react";
        import { HiX } from "react-icons/hi";
        import { MdPercent } from "react-icons/md";
      
        <Banner>
            <div className="flex w-full justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 rounded-md">
                <div className="mx-auto flex items-center">
                <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-gray-600">
                    <MdPercent className="h-4 w-4" />
                    </span>
                    <span className="[&_p]:inline">
                    Get 5% commision per sale&nbsp;
                    <a
                        href="/"
                        className="ml-0 flex items-center text-sm font-medium text-primary hover:underline dark:text-primary md:ml-1 md:inline-flex"
                    >
                        Become a partner
                        <HiArrowRight className="ml-2" />
                    </a>
                    </span>
                </p>
                </div>
                <Banner.CollapseButton
                color="gray"
                className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
                >
                <HiX className="h-4 w-4" />
                </Banner.CollapseButton>
            </div>
        </Banner> 
                `}
          </CodeModal>
        </div>

        <Banner>
          <div className="flex w-full justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 rounded-md">
            <div className="mx-auto flex items-center">
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 p-1 dark:bg-gray-600">
                  <MdPercent className="h-4 w-4" />
                </span>
                <span className="[&_p]:inline">
                  Get 5% commision per sale&nbsp;
                  <a
                    href="/"
                    className="ml-0 flex items-center text-sm font-medium text-primary hover:underline dark:text-primary md:ml-1 md:inline-flex"
                  >
                    Become a partner
                    <HiArrowRight className="ml-2" />
                  </a>
                </span>
              </p>
            </div>
            <Banner.CollapseButton
              color="gray"
              className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
            >
              <HiX className="h-4 w-4" />
            </Banner.CollapseButton>
          </div>
        </Banner>
      </CardBox>
    </div>
  );
};

export default BottomBanner;
