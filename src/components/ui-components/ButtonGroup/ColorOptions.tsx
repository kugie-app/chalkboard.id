import { Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const ColorOptions = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Color Options</h4>
          <CodeModal>
            {`
    import { Button } from "flowbite-react";

    <Button.Group>
        <Button color="primary">Profile</Button>
        <Button color="primary">Settings</Button>
        <Button color="primary">Messages</Button>
    </Button.Group>
    <Button.Group>
        <Button gradientMonochrome="info">Profile</Button>
        <Button gradientMonochrome="info">Settings</Button>
        <Button gradientMonochrome="info">Messages</Button>
    </Button.Group>
    <Button.Group>
        <Button gradientDuoTone="greenToBlue">Profile</Button>
        <Button gradientDuoTone="greenToBlue">Settings</Button>
        <Button gradientDuoTone="greenToBlue">Messages</Button>
    </Button.Group>
            `}
          </CodeModal>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button.Group>
            <Button color="primary">Profile</Button>
            <Button color="primary">Settings</Button>
            <Button color="primary">Messages</Button>
          </Button.Group>
          <Button.Group>
            <Button gradientMonochrome="info">Profile</Button>
            <Button gradientMonochrome="info">Settings</Button>
            <Button gradientMonochrome="info">Messages</Button>
          </Button.Group>
          <Button.Group>
            <Button gradientDuoTone="greenToBlue">Profile</Button>
            <Button gradientDuoTone="greenToBlue">Settings</Button>
            <Button gradientDuoTone="greenToBlue">Messages</Button>
          </Button.Group>
        </div>
      </CardBox>
    </div>
  );
};

export default ColorOptions;
