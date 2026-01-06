"use client";
import React, { useState } from "react";
import { Modal, Tooltip } from "flowbite-react";
import { IconCode } from "@tabler/icons-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeModal = ({ children }: any) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div>
      <Tooltip content="Show Code" trigger="hover" className="whitespace-nowrap">
        <div className="group bg-lightprimary text-primary hover:bg-primary  hover:cursor-pointer p-2 rounded-full">
          <IconCode size={18} onClick={handleOpenModal} className="group-hover:text-white" />
        </div>
      </Tooltip>
      <Modal show={openModal} onClose={handleOpenModal}>
        <Modal.Header className="rounded-t-md border-b border-ld">
          Sample Code
        </Modal.Header>

        <Modal.Body className="overflow-y-auto code-modal">
          {/* @ts-ignore - SyntaxHighlighter component compatibility with React 19 */}
          <SyntaxHighlighter language="html" style={atomDark}>{children}</SyntaxHighlighter>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CodeModal;
