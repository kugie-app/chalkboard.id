import React from "react";
import CodeModal from "../../CodeModal";

const TableDataCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Pagination } from "flowbite-react";
    import { useState } from "react";

    const [tablePage, setTablePage] = useState(1);
    const onTableChange = (page: number) => setTablePage(page);

      <Pagination
        layout="table"
        currentPage={tablePage}
        totalPages={100}
        onPageChange={onTableChange}
        showIcons
      />
                `}
      </CodeModal>
    </div>
  );
};

export default TableDataCode;
