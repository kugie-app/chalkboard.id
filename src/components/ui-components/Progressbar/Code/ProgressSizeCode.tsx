import React from "react";
import CodeModal from "../../CodeModal";

const ProgressSizeCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Progress } from "flowbite-react";

    <div className="text-base font-medium dark:text-white">Small</div>
    <Progress progress={45} size="sm" color="primary" />
    <div className="text-base font-medium dark:text-white">Default</div>
    <Progress progress={45} size="md" color="primary" />
    <div className="text-lg font-medium dark:text-white">Large</div>
    <Progress progress={45} size="lg" color="primary" />
    <div className="text-lg font-medium dark:text-white">Extra Large</div>
    <Progress progress={45} size="xl" color="primary" />
            `}
      </CodeModal>
    </div>
  );
};

export default ProgressSizeCode;
