import React from "react";
import CodeModal from "../../CodeModal";

const ControlTextCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Pagination } from "flowbite-react";
    import { useState } from "react";

    const [controltextPage, setControltextPage] = useState(1);
    const onControtextChange = (page: number) => setControltextPage(page);

      <Pagination
        layout="pagination"
        currentPage={controltextPage}
        totalPages={1000}
        onPageChange={onControtextChange}
        previousLabel="Go back"
        nextLabel="Go forward"
        showIcons
      />
                `}
      </CodeModal>
    </div>
  );
};

export default ControlTextCode;
