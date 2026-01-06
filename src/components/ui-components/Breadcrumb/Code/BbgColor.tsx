import React from "react";
import CodeModal from "../../CodeModal";

const BbgColor = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Breadcrumb } from "flowbite-react";
    import { HiHome } from "react-icons/hi";
    
    <Breadcrumb
      aria-label="Solid background breadcrumb example"
      className="bg-muted px-5 py-3 dark:bg-darkmuted rounded-md"
    >
      <Breadcrumb.Item href="#" icon={HiHome}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
      <Breadcrumb.Item>matdash IM</Breadcrumb.Item>
    </Breadcrumb>  
                `}
      </CodeModal>
    </div>
  );
};

export default BbgColor;
