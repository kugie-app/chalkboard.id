import React from "react";
import CodeModal from "../../CodeModal";

const StackLayoutCode = () => {
  return (
    <div>
      <CodeModal>
        {`
        import { Avatar } from "flowbite-react";
        
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
                  `}
      </CodeModal>
    </div>
  );
};

export default StackLayoutCode;
