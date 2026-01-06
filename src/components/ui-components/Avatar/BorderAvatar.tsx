import { Avatar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const BorderAvatar = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Border Avatar</h4>
          <CodeModal>
            {`
      import { Avatar } from "flowbite-react";
      
      <div className="flex flex-wrap gap-2">
        <Avatar img="/images/profile/user-2.jpg" rounded bordered />
        <Avatar img="/images/profile/user-3.jpg" bordered />
      </div>
                `}
          </CodeModal>
        </div>
        <div className="flex flex-wrap gap-2">
          <Avatar img="/images/profile/user-2.jpg" rounded bordered />
          <Avatar img="/images/profile/user-3.jpg" bordered />
        </div>
      </CardBox>
    </div>
  );
};

export default BorderAvatar;
