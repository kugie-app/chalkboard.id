import { Popover } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const ImagePopover = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">Image popover</h4>
        <p className="text-gray-500 dark:text-gray-400">
          Due to its central geographic location in Southern Europe,{" "}
          <Popover
            trigger="hover"
            content={
              <div className="w-96 text-sm text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                <div className="grid grid-cols-5">
                  <div className="col-span-3 p-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        About Italy
                      </h3>
                      <p>
                        Italy is located in the middle of the Mediterranean Sea,
                        in Southern Europe it is also considered part of Western
                        Europe. A unitary parliamentary republic with Rome as
                        its capital and largest city.
                      </p>
                      <a
                        href="#"
                        className="flex items-center font-medium text-primary hover:text-primary hover:underline dark:text-primary dark:hover:text-primary"
                      >
                        Read more{" "}
                        <svg
                          className="ms-1.5 h-2 w-2 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <img
                    src="https://flowbite.com/docs/images/popovers/italy.png"
                    className="col-span-2 h-full"
                    alt="Italy map"
                  />
                </div>
              </div>
            }
          >
            <a
              href="#"
              className="text-primary underline hover:no-underline dark:text-primary"
            >
              Italy
            </a>
          </Popover>{" "}
          has historically been home to myriad peoples and cultures. In addition
          to the various ancient peoples dispersed throughout what is now
          modern-day Italy, the most predominant being the Indo-European Italic
          peoples who gave the peninsula its name, beginning from the classical
          era, Phoenicians and Carthaginians founded colonies mostly in insular
          Italy the most predominant being the Indo-European Italic peoples who
          gave the peninsula its name, beginning from the classical era,
          Phoenicians and Carthaginians founded colonies mostly in insular Italy
          the most predominant being the Indo-European Italic peoples who gave
          the peninsula its name, beginning from the classical era, Phoenicians
          and Carthaginians founded colonies mostly in insular Italy Phoenicians
          and Carthaginians founded colonies mostly in insular Italy
        </p>
      </CardBox>
    </div>
  );
};

export default ImagePopover;
