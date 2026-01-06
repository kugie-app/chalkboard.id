import React from "react";
import CodeModal from "../../CodeModal";

const DefaultProgressCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Progress } from "flowbite-react";

    <Progress progress={20} />
    <Progress progress={40} />
    <Progress progress={60} />
    <Progress progress={80} />
    <Progress progress={100} />
            `}
      </CodeModal>
    </div>
  );
};

export default DefaultProgressCode;
