import React from "react";
import CodeModal from "../../CodeModal";

const IconCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Badge } from "flowbite-react";
    import { HiCheck,HiClock } from "react-icons/hi";
    
    <div className="flex flex-wrap gap-2 mt-2">
        <Badge color="primary" icon={HiCheck} />
        <Badge color="secondary" icon={HiClock} />
        <Badge color="primary" size="sm" icon={HiCheck} />
        <Badge color="secondary" size="sm" icon={HiClock} />
        <Badge color="error" size="sm" icon={HiCheck} />
        <Badge color="warning" size="sm" icon={HiClock} />
    </div>
    <div className="flex flex-wrap gap-2">
        <Badge color="primary" icon={HiCheck} />
        <Badge color="secondary" icon={HiClock} />
        <Badge color="primary" size="sm" icon={HiCheck} />
        <Badge color="secondary" size="sm" icon={HiClock} />
        <Badge color="error" size="sm" icon={HiCheck} />
        <Badge color="warning" size="sm" icon={HiClock} />
    </div>
                `}
      </CodeModal>
    </>
  );
};

export default IconCode;
