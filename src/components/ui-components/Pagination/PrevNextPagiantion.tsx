"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import PrevNextbuttonCode from "./Code/PrevNextbuttonCode";

const PrevNextPagiantion = () => {
  const [flowPagin, setFlowPagin] = useState(1);
  const onFlowChange = (page: number) => setFlowPagin(page);

  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-2">
            Previous And Next Button
          </h4>
          <PrevNextbuttonCode />
        </div>
        <div className="flex overflow-x-auto sm:justify-center py-4">
          <Pagination
            layout="navigation"
            currentPage={flowPagin}
            totalPages={100}
            onPageChange={onFlowChange}
          />
        </div>
      </CardBox>
    </div>
  );
};

export default PrevNextPagiantion;
