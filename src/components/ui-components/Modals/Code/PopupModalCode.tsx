import React from "react";
import CodeModal from "../../CodeModal";

const PopupModalCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Button, Modal } from "flowbite-react";
    import { useState } from "react";

    const [popupModal, setPopupModal] = useState(true);
    
    <Button
    onClick={() => setPopupModal(true)}
    className="w-fit"
    color="secondary">Pop-up modal</Button>
    <Modal
    show={popupModal}
    size="md"
    onClose={() => setPopupModal(false)}
    popup
    className="rounded-t-md"
    >
        <Modal.Header />
        <Modal.Body>
            <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
                <Button color="error" onClick={() => setPopupModal(false)}>
                {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setPopupModal(false)}>
                No, cancel
                </Button>
            </div>
            </div>
        </Modal.Body>   
    </Modal>
              `}
      </CodeModal>
    </div>
  );
};

export default PopupModalCode;
