import React from "react";
import CodeModal from "../../CodeModal";

const DefaultListcode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { ListGroup } from "flowbite-react";
    
    <ListGroup>
      <ListGroup.Item>Profile</ListGroup.Item>
      <ListGroup.Item>Settings</ListGroup.Item>
      <ListGroup.Item>Messages</ListGroup.Item>
      <ListGroup.Item disabled>Download</ListGroup.Item>
    </ListGroup>
                `}
      </CodeModal>
    </div>
  );
};

export default DefaultListcode;
