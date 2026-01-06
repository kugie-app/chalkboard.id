import React from "react";
import CodeModal from "../../CodeModal";

const ProgressColorCode = () => {
  return (
    <div>
      <CodeModal>
        {`
      import { Progress } from "flowbite-react";
      
      <div className="text-base font-medium text-primary">Primary</div>
      <Progress progress={45} color="primary" />
      <div className="text-base font-medium text-secondary">Secondary</div>
      <Progress progress={45} color="secondary" />
      <div className="text-base font-medium text-error">Error</div>
      <Progress progress={45} color="error" />
      <div className="text-base font-medium text-success">Success</div>
      <Progress progress={45} color="success" />
      <div className="text-base font-medium text-warning">Warning</div>
      <Progress progress={45} color="warning" />
      <div className="text-base font-medium text-info">Info</div>
      <Progress progress={45} color="info" />
              `}
      </CodeModal>
    </div>
  );
};

export default ProgressColorCode;
