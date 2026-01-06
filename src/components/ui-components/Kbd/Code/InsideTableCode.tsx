import React from "react";
import CodeModal from "../../CodeModal";

const InsideTableCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    import { Kbd, Table } from "flowbite-react";
    import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";

    <Table>
      <Table.Head>
        <Table.HeadCell>Key</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Kbd className="rounded-md">Shift</Kbd> <span>or</span>{" "}
            <Kbd className="rounded-md">Tab</Kbd>
          </Table.Cell>
          <Table.Cell>Navigate to interactive elements</Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <Kbd className="rounded-md">Enter</Kbd> or{" "}
            <Kbd className="rounded-md">Spacebar</Kbd>
          </Table.Cell>
          <Table.Cell>
            Ensure elements with ARIA role="button" can be activated
            with both key commands.
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <span className="inline-flex gap-1">
              <Kbd icon={MdKeyboardArrowUp} />
              <Kbd icon={MdKeyboardArrowDown} />
            </span>
            <span> or </span>
            <span className="inline-flex gap-1">
              <Kbd icon={MdKeyboardArrowLeft} />
              <Kbd icon={MdKeyboardArrowRight} />
            </span>
          </Table.Cell>
          <Table.Cell>
            Choose and activate previous/next tab.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>  
                `}
      </CodeModal>
    </div>
  );
};

export default InsideTableCode;
