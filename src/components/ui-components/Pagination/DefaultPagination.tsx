"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import DefaultPaginationCode from "./Code/DefaultPaginationCode";

const DefaultPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Default Pagination</h4>
          <DefaultPaginationCode />
        </div>
        <div className="flex sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={100}
            onPageChange={onPageChange}
          />
        </div>
      </CardBox>
    </div>
  );
};

export default DefaultPagination;
