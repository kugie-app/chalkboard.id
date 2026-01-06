import React from "react";
import CardBox from "../../shared/CardBox";
import { Avatar } from "flowbite-react";
import SizeAvatarCode from "./Code/SizeAvatarCode";

const SizeAvatar = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Avatar Sizes</h4>
          <SizeAvatarCode />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Avatar img="/images/profile/user-5.jpg" size="xs" />
          <Avatar img="/images/profile/user-5.jpg" size="sm" />
          <Avatar img="/images/profile/user-5.jpg" size="md" />
          <Avatar img="/images/profile/user-5.jpg" size="lg" />
        </div>
      </CardBox>
    </div>
  );
};

export default SizeAvatar;
