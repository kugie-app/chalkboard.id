"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import TableDataCode from "./Code/TableDataCode";

const TableDataPaginationIcon = () => {
    const [tablePage, setTablePage] = useState(1);
    const onTableChange = (page: number) => setTablePage(page);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
           Table Data Navigation
          </h4>
          <TableDataCode/>
        </div>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="table"
            currentPage={tablePage}
            totalPages={100}
            onPageChange={onTableChange}
            showIcons
          />
        </div>
      </CardBox>
    </div>
  );
};

export default TableDataPaginationIcon;
