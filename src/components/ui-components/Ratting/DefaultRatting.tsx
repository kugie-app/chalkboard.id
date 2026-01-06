"use client";
import { Rating } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const DefaultRatting = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default rating</h4>
          <CodeModal>
            {`
    import { Rating } from "flowbite-react";

    <Rating>
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star filled={false} />
    </Rating>  
                `}
          </CodeModal>
        </div>
        <Rating>
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star filled={false} />
        </Rating>
      </CardBox>
    </div>
  );
};

export default DefaultRatting;
