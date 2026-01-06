import { Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";

const OutlineButtonGroup = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Outline button group</h4>
          <CodeModal>
            {`
      import { Button } from "flowbite-react";
      
      <div className="flex flex-wrap gap-2">
        <Button.Group outline>
          <Button color="gray">Profile</Button>
          <Button color="gray">Settings</Button>
          <Button color="gray">Messages</Button>
        </Button.Group>
        <Button.Group outline>
          <Button gradientMonochrome="info">Profile</Button>
          <Button gradientMonochrome="info">Settings</Button>
          <Button gradientMonochrome="info">Messages</Button>
        </Button.Group>
        <Button.Group outline>
          <Button gradientDuoTone="cyanToBlue">Profile</Button>
          <Button gradientDuoTone="cyanToBlue">Settings</Button>
          <Button gradientDuoTone="cyanToBlue">Messages</Button>
        </Button.Group>
      </div>
                `}
          </CodeModal>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button.Group outline>
            <Button color="gray">Profile</Button>
            <Button color="gray">Settings</Button>
            <Button color="gray">Messages</Button>
          </Button.Group>
          <Button.Group outline>
            <Button gradientMonochrome="info">Profile</Button>
            <Button gradientMonochrome="info">Settings</Button>
            <Button gradientMonochrome="info">Messages</Button>
          </Button.Group>
          <Button.Group outline>
            <Button gradientDuoTone="cyanToBlue">Profile</Button>
            <Button gradientDuoTone="cyanToBlue">Settings</Button>
            <Button gradientDuoTone="cyanToBlue">Messages</Button>
          </Button.Group>
        </div>
      </CardBox>
    </div>
  );
};

export default OutlineButtonGroup;
