import React from "react";
import CodeModal from "../../CodeModal";

const DefaultButtonCode = () => {
  return (
    <>
      <CodeModal>
        {`
    import { Button } from "flowbite-react";

    <div className="flex flex-wrap gap-2 mt-2">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="info">Info</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Danger</Button>
      <Button color="light">Light</Button>
      <Button color="dark">Dark</Button>
    </div>    
      `}
      </CodeModal>
    </>
  );
};

export default DefaultButtonCode;
