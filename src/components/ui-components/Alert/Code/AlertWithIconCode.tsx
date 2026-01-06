import React from "react";
import CodeModal from "../../CodeModal";

const AlertWithIconCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { HiInformationCircle } from "react-icons/hi";
    import { Alert } from "flowbite-react";

    <Alert
      color="primary"
      icon={HiInformationCircle}
      className="rounded-md"
    >
      <span className="font-medium">Primary</span> - A simple primary
      alert
    </Alert>

    <Alert
      color="secondary"
      icon={HiInformationCircle}
      className="rounded-md"
    >
      <span className="font-medium">Secondary</span> - A simple
      secondary alert
    </Alert>

    <Alert
      color="success"
      icon={HiInformationCircle}
      className="rounded-md"
    >
      <span className="font-medium">Success</span> - A simple success
      alert
    </Alert>

    <Alert
      color="info"
      icon={HiInformationCircle}
      className="rounded-md"
    >
      <span className="font-medium">Info</span> - A simple Info alert
    </Alert>

    <Alert
      color="warning"
      icon={HiInformationCircle}
      className="rounded-md"
    >
      <span className="font-medium">Warning</span> - A simple warning
      alert
    </Alert>

    <Alert
      color="error"
      icon={HiInformationCircle}
      className="rounded-md"
    >
      <span className="font-medium">Danger</span> - A simple Danger
      alert
    </Alert>

    <Alert
      color="dark"
      icon={HiInformationCircle}
      className="rounded-md"
    >
      <span className="font-medium">Dark</span> - A simple Dark alert
    </Alert>
                  `}
      </CodeModal>
    </div>
  );
};

export default AlertWithIconCode;
