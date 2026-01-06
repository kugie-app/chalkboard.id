import React from "react";
import CodeModal from "../../CodeModal";

const ListIconCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { ListGroup } from "flowbite-react";
    import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";
    
    <ListGroup>
      <ListGroup.Item icon={HiUserCircle} active>
        Profile
      </ListGroup.Item>
      <ListGroup.Item icon={HiOutlineAdjustments}>
        Settings
      </ListGroup.Item>
      <ListGroup.Item icon={HiInbox}>Messages</ListGroup.Item>
      <ListGroup.Item icon={HiCloudDownload}>Download</ListGroup.Item>
    </ListGroup>  
                `}
      </CodeModal>
    </div>
  );
};

export default ListIconCode;
