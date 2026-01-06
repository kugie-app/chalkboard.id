import React from "react";
import CodeModal from "../../CodeModal";

const LabelProgressCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Progress } from "flowbite-react";
    
   <Progress
          progress={20}
          textLabel="Progress"
          size="lg"
          labelProgress
          labelText
    />
    <Progress
        progress={40}
        textLabel="Progress"
        size="lg"
        labelProgress
        labelText
    />
    <Progress
        progress={60}
        textLabel="Progress"
        size="lg"
        labelProgress
        labelText
    />
    <Progress
        progress={80}
        textLabel="Progress"
        size="lg"
        labelProgress
        labelText
    />
    <Progress
        progress={100}
        textLabel="Progress"
        size="lg"
        labelProgress
        labelText
    />  
              `}
      </CodeModal>
    </div>
  );
};

export default LabelProgressCode;
