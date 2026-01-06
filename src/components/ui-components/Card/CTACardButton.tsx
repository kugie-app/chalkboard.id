import { Card, Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const CTACardButton = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Card With CTA Button</h4>
          <CodeModal>
            {`
      import { Button, Card } from "flowbite-react";
      
      <Card>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 pb-[0.625rem]">
          Here are the biggest enterprise technology acquisitions of 2024 so far, in reverse chronological order.It is a long established fact that a reader will be distracted by the readable content of a page.
        </p>
        <Button color="primary" >
          Read more
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>  
                `}
          </CodeModal>
        </div>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-[0.625rem]">
            Here are the biggest enterprise technology acquisitions of 2024 so
            far, in reverse chronological order.It is a long established fact that a reader will be distracted by
            the readable content of a page.
          </p>
          <Button color="primary" >
            Read more
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
      </CardBox>
    </div>
  );
};

export default CTACardButton;
