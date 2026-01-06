import { Avatar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import StackLayoutCode from "./Code/StackLayoutCode";

const StackAvatar = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Stacked layout</h4>
          <StackLayoutCode />
        </div>
        <div className="flex flex-col flex-wrap gap-5">
          <Avatar.Group>
            <Avatar img="/images/profile/user-2.jpg" rounded stacked />
            <Avatar img="/images/profile/user-3.jpg" rounded stacked />
            <Avatar img="/images/profile/user-4.jpg" rounded stacked />
            <Avatar img="/images/profile/user-5.jpg" rounded stacked />
            <Avatar img="/images/profile/user-6.jpg" rounded stacked />
          </Avatar.Group>
          <Avatar.Group>
            <Avatar img="/images/profile/user-2.jpg" rounded stacked />
            <Avatar img="/images/profile/user-3.jpg" rounded stacked />
            <Avatar img="/images/profile/user-4.jpg" rounded stacked />
            <Avatar img="/images/profile/user-5.jpg" rounded stacked />
            <Avatar.Counter total={99} href="#" />
          </Avatar.Group>
        </div>
      </CardBox>
    </div>
  );
};

export default StackAvatar;
