import React from "react";
import CodeModal from "../../CodeModal";

const BDefaultCode = () => {
  return (
    <div>
      <CodeModal>
        {`  
    import { Breadcrumb } from "flowbite-react";
    import { HiHome } from "react-icons/hi";
    
    <Breadcrumb aria-label="Default breadcrumb example">
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

export default BDefaultCode;
