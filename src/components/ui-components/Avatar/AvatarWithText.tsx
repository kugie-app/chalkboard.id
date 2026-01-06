import { Avatar } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const AvatarWithText = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-lg font-semibold">Avatar With Text</h4>
          </div>
          <CodeModal>
            {`
        import { Avatar } from "flowbite-react";
      
        <Avatar img="/images/profile/user-2.jpg" rounded>
            <div className="space-y-1 font-medium dark:text-white">
              <div className="text-ld">Jese Leos</div>
              <div className="text-sm text-darklink">Joined in August 2014</div>
            </div>
        </Avatar>  
                `}
          </CodeModal>
        </div>

        <Avatar img="/images/profile/user-2.jpg" rounded>
          <div className="space-y-1 font-medium dark:text-white">
            <div className="text-ld">Jese Leos</div>
            <div className="text-sm text-darklink">Joined in August 2014</div>
          </div>
        </Avatar>
      </CardBox>
    </div>
  );
};

export default AvatarWithText;
