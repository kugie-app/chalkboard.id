"use client";
import { Rating } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const AdvanceRatting = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Advanced Rating</h4>
          <CodeModal>
            {`
      import { Rating } from "flowbite-react";

      <Rating className="mb-2">
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star />
        <Rating.Star filled={false} />
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          4.95 out of 5
        </p>
      </Rating>
      <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        1,745 global ratings
      </p>
      <Rating.Advanced percentFilled={70} className="mb-2">
        5 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={17} className="mb-2">
        4 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={8} className="mb-2">
        3 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={4} className="mb-2">
        2 star
      </Rating.Advanced>
      <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
                `}
          </CodeModal>
        </div>
        <Rating className="mb-2">
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star filled={false} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            4.95 out of 5
          </p>
        </Rating>
        <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          1,745 global ratings
        </p>
        <Rating.Advanced percentFilled={70} className="mb-2">
          5 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={17} className="mb-2">
          4 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={8} className="mb-2">
          3 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={4} className="mb-2">
          2 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={1}>1 star</Rating.Advanced>
      </CardBox>
    </div>
  );
};

export default AdvanceRatting;
