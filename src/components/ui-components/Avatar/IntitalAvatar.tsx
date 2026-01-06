import React from "react";
import CardBox from "../../shared/CardBox";
import { Avatar } from "flowbite-react";
import CodeModal from "../CodeModal";

const IntitalAvatar = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Placeholder Initials</h4>
          <CodeModal>
            {`
    import { Avatar } from "flowbite-react";
    
    <div className="flex flex-wrap gap-2">
        <Avatar placeholderInitials="RR" />
        <Avatar placeholderInitials="RR" rounded />
    </div>
              `}
          </CodeModal>
        </div>

        <div className="flex flex-wrap gap-2">
          <Avatar placeholderInitials="RR" />
          <Avatar placeholderInitials="RR" rounded />
        </div>
      </CardBox>
    </div>
  );
};

export default IntitalAvatar;
