import { Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const DefaultGroup = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default Button Group</h4>
          <CodeModal>
            {`
    import { Button } from "flowbite-react";

    <Button.Group>
    <Button color="gray">Profile</Button>
    <Button color="gray">Settings</Button>
    <Button color="gray">Messages</Button>
    </Button.Group>
    <Button.Group>
    <Button color="gray">Profile</Button>
    <Button color="gray">Settings</Button>
    <Button color="gray">Messages</Button>
    </Button.Group>
    <Button.Group>
    <Button color="gray">Profile</Button>
    <Button color="gray">Settings</Button>
    <Button color="gray">Messages</Button>
    </Button.Group>
            `}
          </CodeModal>
        </div>

        <Button.Group>
          <Button color="gray">Profile</Button>
          <Button color="gray">Settings</Button>
          <Button color="gray">Messages</Button>
        </Button.Group>
        <Button.Group>
          <Button color="gray">Profile</Button>
          <Button color="gray">Settings</Button>
          <Button color="gray">Messages</Button>
        </Button.Group>
        <Button.Group>
          <Button color="gray">Profile</Button>
          <Button color="gray">Settings</Button>
          <Button color="gray">Messages</Button>
        </Button.Group>
      </CardBox>
    </div>
  );
};

export default DefaultGroup;
