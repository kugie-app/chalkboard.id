import { Button } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";
import CodeModal from "../CodeModal";
import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";
const GroupWithIcon = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
           Group With Icons
          </h4>
          <CodeModal>
            {`
    import { Button } from "flowbite-react";
    import { HiAdjustments, HiCloudDownload, HiUserCircle } from "react-icons/hi";
    
    <div className="flex flex-wrap gap-2">
      <Button.Group outline>
        <Button color="gray">
          <HiUserCircle className="mr-3 h-4 w-4" />
          Profile
        </Button>
        <Button color="gray">
          <HiAdjustments className="mr-3 h-4 w-4" />
          Settings
        </Button>
        <Button color="gray">
          <HiCloudDownload className="mr-3 h-4 w-4" />
          Messages
        </Button>
      </Button.Group>
      <Button.Group outline>
        <Button gradientMonochrome="info">
          <HiUserCircle className="mr-3 h-4 w-4" />
          Profile
        </Button>
        <Button gradientMonochrome="info">
          <HiAdjustments className="mr-3 h-4 w-4" />
          Settings
        </Button>
        <Button gradientMonochrome="info">
          <HiCloudDownload className="mr-3 h-4 w-4" />
          Messages
        </Button>
      </Button.Group>
      <Button.Group outline>
        <Button gradientDuoTone="cyanToBlue">
          <HiUserCircle className="mr-3 h-4 w-4" />
          Profile
        </Button>
        <Button gradientDuoTone="cyanToBlue">
          <HiAdjustments className="mr-3 h-4 w-4" />
          Settings
        </Button>
        <Button gradientDuoTone="cyanToBlue">
          <HiCloudDownload className="mr-3 h-4 w-4" />
          Messages
        </Button>
      </Button.Group>
    </div>
                `}
          </CodeModal>
        </div>
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          <Button.Group outline>
            <Button color="gray">
              <HiUserCircle className="mr-3 h-4 w-4" />
              Profile
            </Button>
            <Button color="gray">
              <HiAdjustments className="mr-3 h-4 w-4" />
              Settings
            </Button>
            <Button color="gray">
              <HiCloudDownload className="mr-3 h-4 w-4" />
              Messages
            </Button>
          </Button.Group>
          <Button.Group outline>
            <Button gradientMonochrome="info">
              <HiUserCircle className="mr-3 h-4 w-4" />
              Profile
            </Button>
            <Button gradientMonochrome="info">
              <HiAdjustments className="mr-3 h-4 w-4" />
              Settings
            </Button>
            <Button gradientMonochrome="info">
              <HiCloudDownload className="mr-3 h-4 w-4" />
              Messages
            </Button>
          </Button.Group>
          <Button.Group outline>
            <Button gradientDuoTone="cyanToBlue">
              <HiUserCircle className="mr-3 h-4 w-4" />
              Profile
            </Button>
            <Button gradientDuoTone="cyanToBlue">
              <HiAdjustments className="mr-3 h-4 w-4" />
              Settings
            </Button>
            <Button gradientDuoTone="cyanToBlue">
              <HiCloudDownload className="mr-3 h-4 w-4" />
              Messages
            </Button>
          </Button.Group>
        </div>
      </CardBox>
    </div>
  );
};

export default GroupWithIcon;
