import React from "react";
import CardBox from "../../shared/CardBox";
import Image from "next/image";
import user1 from "/public/images/profile/user-2.jpg";
import user2 from "/public/images/profile/user-3.jpg";
import user3 from "/public/images/profile/user-4.jpg";
import { Button } from "flowbite-react";

const userImg = [
  {
    user: user1,
  },
  {
    user: user2,
  },
  {
    user: user3,
  },
];
const StillHaveQst = () => {
  return (
    <>
      <CardBox className="bg-lightprimary dark:bg-lightprimary mt-10 rounded-md text-center py-8">
        <div className="flex justify-center">
          {userImg.map((item, index) => (
            <div className="-ms-2  h-11 w-11" key={index}>
              <Image
                src={item.user}
                className="border-2 border-white dark:border-darkborder rounded-full"
                alt="icon"
              />
            </div>
          ))}
        </div>
        <h4 className="text-2xl font-bold mt-4">Still have questions</h4>
        <p className="text-primary dark:text-primary text-base ">
          Can't find the answer your're looking for ? Please chat to our
          friendly team.
        </p>
        <Button color={'primary'} className="w-fit mx-auto mt-4">Chat with us</Button>
      </CardBox>
    </>
  );
};

export default StillHaveQst;
