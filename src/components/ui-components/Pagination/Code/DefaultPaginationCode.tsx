import React from "react";
import CodeModal from "../../CodeModal";

const DefaultPaginationCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Pagination } from "flowbite-react";
    import { useState } from "react";

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page: number) => setCurrentPage(page);

      <Pagination
        currentPage={currentPage}
        totalPages={100}
        onPageChange={onPageChange}
      />
                `}
      </CodeModal>
    </div>
  );
};

export default DefaultPaginationCode;
