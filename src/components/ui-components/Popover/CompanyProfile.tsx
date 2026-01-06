import React from "react";
import CardBox from "../../shared/CardBox";
import { Popover, Button } from "flowbite-react";
import CodeModal from "../CodeModal";

const CompanyProfile = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Company Profile</h4>
          <CodeModal>
            {`
    import { Popover, Button } from "flowbite-react";

    <Popover
          aria-labelledby="profile-popover"
          content={
            <div className="w-64 p-3 ">
              <div className="mb-2 flex items-center justify-between">
                <a href="#">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/images/profile/user-3.jpg"
                    alt="Jese Leos"
                  />
                </a>
                <div>
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-primary dark:hover:bg-primaryemphasis dark:focus:ring-blue-600 "
                  >
                    Follow
                  </button>
                </div>
              </div>
              <p
                id="profile-popover"
                className="text-base font-semibold leading-none text-gray-900 dark:text-white"
              >
                <a href="#">Jese Leos</a>
              </p>
              <p className="mb-3 text-sm font-normal">
                <a href="#" className="hover:underline">
                  @jeseleos
                </a>
              </p>
              <p className="mb-4 text-sm">
                Open-source contributor. Building{" "}
                <a
                  href="#"
                  className="text-primary hover:underline dark:text-primary"
                >
                  matdash IM
                </a>
                .
              </p>
              <ul className="flex text-sm">
                <li className="me-2">
                  <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      799
                    </span>
                    <span>Following</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      3,758
                    </span>
                    <span>Followers</span>
                  </a>
                </li>
              </ul>
            </div>
          }
        >
          <Button color="primary" >
            Company profile
          </Button>
    </Popover>
                `}
          </CodeModal>
        </div>
        <Popover
          aria-labelledby="profile-popover"
          content={
            <div className="w-64 p-3 ">
              <div className="mb-2 flex items-center justify-between">
                <a href="#">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/images/profile/user-3.jpg"
                    alt="Jese Leos"
                  />
                </a>
                <div>
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-primary dark:hover:bg-primaryemphasis dark:focus:ring-blue-600 "
                  >
                    Follow
                  </button>
                </div>
              </div>
              <p
                id="profile-popover"
                className="text-base font-semibold leading-none text-gray-900 dark:text-white"
              >
                <a href="#">Jese Leos</a>
              </p>
              <p className="mb-3 text-sm font-normal">
                <a href="#" className="hover:underline">
                  @jeseleos
                </a>
              </p>
              <p className="mb-4 text-sm">
                Open-source contributor. Building{" "}
                <a
                  href="#"
                  className="text-primary hover:underline dark:text-primary"
                >
                  matdash IM
                </a>
                .
              </p>
              <ul className="flex text-sm">
                <li className="me-2">
                  <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      799
                    </span>
                    <span>Following</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      3,758
                    </span>
                    <span>Followers</span>
                  </a>
                </li>
              </ul>
            </div>
          }
        >
          <Button color="primary">Company profile</Button>
        </Popover>
      </CardBox>
    </div>
  );
};

export default CompanyProfile;
