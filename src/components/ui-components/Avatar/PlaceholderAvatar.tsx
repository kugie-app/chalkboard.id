import { Avatar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const PlaceholderAvatar = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Placeholder Avatar</h4>
          <CodeModal>
            {`
    import { Avatar } from "flowbite-react";
    
    <div className="flex flex-wrap gap-2">
        <Avatar />
        <Avatar rounded />
    </div>
              `}
          </CodeModal>
        </div>

        <div className="flex flex-wrap gap-2">
          <Avatar />
          <Avatar rounded />
        </div>
      </CardBox>
    </div>
  );
};

export default PlaceholderAvatar;
