import { Banner } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";
import { MdAnnouncement } from "react-icons/md";
import { HiX } from "react-icons/hi";
const StickyBanner = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default sticky banner</h4>
          <CodeModal>
            {`
      import { Banner } from "flowbite-react";
      import { HiX } from "react-icons/hi";
      import { MdAnnouncement } from "react-icons/md";
      
      <Banner>
        <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 rounded-md">
          <div className="mx-auto flex items-center">
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <MdAnnouncement className="mr-4 h-4 w-4" />
              <span className="[&_p]:inline">
                New brand identity has been launched for the&nbsp;
                <a
                  href="/"
                  className="inline font-medium text-primary underline decoration-solid underline-offset-2 hover:no-underline dark:text-primary"
                >
                  matdashIM
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
          <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700 rounded-md">
            <div className="mx-auto flex items-center">
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                <MdAnnouncement className="mr-4 h-4 w-4" />
                <span className="[&_p]:inline">
                  New brand identity has been launched for the&nbsp;
                  <a
                    href="/"
                    className="inline font-medium text-primary underline decoration-solid underline-offset-2 hover:no-underline dark:text-primary"
                  >
                    matdashIM
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

export default StickyBanner;
