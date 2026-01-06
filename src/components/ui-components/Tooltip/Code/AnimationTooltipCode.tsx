import React from "react";
import CodeModal from "../../CodeModal";

const AnimationTooltipCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Button, Tooltip } from "flowbite-react";
    
    <div className="grid grid-cols-12 gap-6 items-center gap-5 mt-2">
          <div className="lg:col-span-3  md:col-span-6 col-span-12">
            <Tooltip content="Tooltip content" animation={false}>
              <Button color="primary" className="w-full">
                Not animated tooltip
              </Button>
            </Tooltip>
          </div>
          <div className="lg:col-span-3  md:col-span-6 col-span-12">
            <Tooltip content="Tooltip content" animation="duration-150">
              <Button color="secondary" className="w-full">
                Fast animation
              </Button>
            </Tooltip>
          </div>
          <div className="lg:col-span-3  md:col-span-6 col-span-12">
            <Tooltip content="Tooltip content" animation="duration-300">
              <Button color="info" className="w-full">
                Normal speed animation
              </Button>
            </Tooltip>
          </div>
          <div className="lg:col-span-3  md:col-span-6 col-span-12">
            <Tooltip content="Tooltip content" animation="duration-500">
              <Button color="success" className="w-full">
                Slow animation
              </Button>
            </Tooltip>
          </div>
          <div className="lg:col-span-3  md:col-span-6 col-span-12">
            <Tooltip content="Tooltip content" animation="duration-1000">
              <Button color="error" className="w-full">
                Really slow animation
              </Button>
            </Tooltip>
          </div>
    </div>
                `}
      </CodeModal>
    </div>
  );
};

export default AnimationTooltipCode;
