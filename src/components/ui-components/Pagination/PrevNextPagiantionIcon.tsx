"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import PrevNextIconCode from "./Code/PrevNextIconCode";

const PrevNextPagiantionIcon = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-2">With Icon</h4>
          <PrevNextIconCode />
        </div>
        <div className="flex overflow-x-auto sm:justify-center py-4">
          <Pagination
            layout="navigation"
            currentPage={currentPage}
            totalPages={100}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </CardBox>
    </div>
  );
};

export default PrevNextPagiantionIcon;
