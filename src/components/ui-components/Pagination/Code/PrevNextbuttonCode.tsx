import React from "react";
import CodeModal from "../../CodeModal";

const PrevNextbuttonCode = () => {
  return (
    <div>
      <CodeModal>
        {`
    "use client";
    import { Pagination } from "flowbite-react";
    import { useState } from "react";
    
    const [flowPagin, setFlowPagin] = useState(1);
    const onFlowChange = (page: number) => setFlowPagin(page);

      <Pagination
        layout="navigation"
        currentPage={flowPagin}
        totalPages={100}
        onPageChange={onFlowChange}
      />
                `}
      </CodeModal>
    </div>
  );
};

export default PrevNextbuttonCode;
