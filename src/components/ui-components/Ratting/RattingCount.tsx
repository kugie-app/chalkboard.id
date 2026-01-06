"use client";
import { Rating } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const RattingCount = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Rating Count</h4>
          <CodeModal>
            {`
    import { Rating } from "flowbite-react";

     <Rating>
          <Rating.Star />
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            4.95
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <a
            href="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            73 reviews
          </a>
    </Rating>  
                `}
          </CodeModal>
        </div>

        <Rating>
          <Rating.Star />
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            4.95
          </p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
          <a
            href="#"
            className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
          >
            73 reviews
          </a>
        </Rating>
      </CardBox>
    </div>
  );
};

export default RattingCount;
