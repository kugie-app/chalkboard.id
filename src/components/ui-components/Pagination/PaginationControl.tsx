"use client";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import ControlTextCode from "./Code/ControlTextCode";
import { Pagination } from "flowbite-react";

const PaginationControl = () => {
  const [controltextPage, setControltextPage] = useState(1);
  const onControtextChange = (page: number) => setControltextPage(page);

  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">
            Pagination Control Button Text
          </h4>
          <ControlTextCode />
        </div>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={controltextPage}
            totalPages={1000}
            onPageChange={onControtextChange}
            previousLabel="Go back"
            nextLabel="Go forward"
            showIcons
          />
        </div>
      </CardBox>
    </div>
  );
};

export default PaginationControl;
