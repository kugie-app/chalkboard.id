import React from "react";
import CodeModal from "../../CodeModal";

const TopDrawerCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Button, Drawer } from "flowbite-react";
    import { useState } from "react";
    
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    <Drawer open={isOpen} onClose={handleClose} className="p-4" position="top">
        <Drawer.Header title="Drawer" />
        <Drawer.Items>
        <p className="mb-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
        </p>

        <Button color={"primary"}>Learn More</Button>
        </Drawer.Items>
    </Drawer>
    `}
      </CodeModal>
    </div>
  );
};

export default TopDrawerCode;
