import React from "react";
import CodeModal from "../../CodeModal";

const ListButtonCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { ListGroup } from "flowbite-react";

    <ListGroup>
      <ListGroup.Item
        onClick={() => alert("Profile clicked!")}
        active
      >
        Profile
      </ListGroup.Item>
      <ListGroup.Item>Settings</ListGroup.Item>
      <ListGroup.Item>Messages</ListGroup.Item>
      <ListGroup.Item>Download</ListGroup.Item>
    </ListGroup>
                `}
      </CodeModal>
    </div>
  );
};

export default ListButtonCode;
