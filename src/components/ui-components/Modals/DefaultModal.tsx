"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import { Button, Modal } from "flowbite-react";
import DefaultModalCode from "./Code/DefaultModalCode";

const DefaultModal = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Default Modal</h4>
          <DefaultModalCode/>
        </div>
        <div className="mt-2">
          <Button
            onClick={() => setOpenModal(true)}
            className="w-full"
            color="primary"
          >
            Default Modal
          </Button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header className="rounded-t-md pb-0">
              Terms of Service
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  With less than a month to go before the European Union enacts
                  new consumer privacy laws for its citizens, companies around
                  the world are updating their terms of service agreements to
                  comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  The European Union’s General Data Protection Regulation
                  (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                  common set of data rights in the European Union. It requires
                  organizations to notify users as soon as possible of high-risk
                  data breaches that could personally affect them.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => setOpenModal(false)}
                className=" bg-primary"
              >
                I accept
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </CardBox>
    </div>
  );
};

export default DefaultModal;
