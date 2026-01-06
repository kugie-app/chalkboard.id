import React from "react";
import CodeModal from "../../CodeModal";

const SizeAvatarCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Avatar } from "flowbite-react";
      
    <div className="flex flex-wrap items-center gap-2">
        <Avatar img="/images/profile/user-5.jpg" size="xs" />
        <Avatar img="/images/profile/user-5.jpg" size="sm" />
        <Avatar img="/images/profile/user-5.jpg" size="md" />
        <Avatar img="/images/profile/user-5.jpg" size="lg" />
    </div>
                `}
      </CodeModal>
    </div>
  );
};

export default SizeAvatarCode;
