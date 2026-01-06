"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Button, Modal } from "flowbite-react";
import PopupModalCode from "./Code/PopupModalCode";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const PopupModal = () => {
  const [popupModal, setPopupModal] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Pop-up Modal</h4>
          <PopupModalCode/>
        </div>
        <div className="mt-2">
          <Button
            onClick={() => setPopupModal(true)}
            className="w-full"
            color="secondary"
          >
            Pop-up Modal
          </Button>
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
        </div>
      </CardBox>
    </div>
  );
};

export default PopupModal;
