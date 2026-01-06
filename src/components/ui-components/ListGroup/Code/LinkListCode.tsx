import React from "react";
import CodeModal from "../../CodeModal";

const LinkListCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { ListGroup } from "flowbite-react";
    
    <ListGroup>
      <ListGroup.Item href="#" active>
        Profile
      </ListGroup.Item>
      <ListGroup.Item href="#">Settings</ListGroup.Item>
      <ListGroup.Item href="#">Messages</ListGroup.Item>
      <ListGroup.Item href="#">Download</ListGroup.Item>
    </ListGroup>
                `}
      </CodeModal>
    </div>
  );
};

export default LinkListCode;
