import { Avatar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";
import ColorAvatarCode from "./Code/ColorAvatarCode";

const ColorAvatar = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Colors</h4>
          <ColorAvatarCode />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <Avatar
              img="/images/profile/user-5.jpg"
              rounded
              bordered
              color="gray"
            />
            <Avatar
              img="/images/profile/user-5.jpg"
              rounded
              bordered
              color="light"
            />
            <Avatar
              img="/images/profile/user-5.jpg"
              rounded
              bordered
              color="purple"
            />
            <Avatar
              img="/images/profile/user-5.jpg"
              rounded
              bordered
              color="success"
            />
            <Avatar
              img="/images/profile/user-5.jpg"
              rounded
              bordered
              color="pink"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Avatar img="/images/profile/user-5.jpg" bordered color="gray" />
            <Avatar img="/images/profile/user-5.jpg" bordered color="light" />
            <Avatar img="/images/profile/user-5.jpg" bordered color="purple" />
            <Avatar img="/images/profile/user-5.jpg" bordered color="success" />
            <Avatar img="/images/profile/user-5.jpg" bordered color="pink" />
          </div>
        </div>
      </CardBox>
    </div>
  );
};

export default ColorAvatar;
