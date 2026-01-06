"use client";
import { Pagination } from "flowbite-react";
import React, { useState } from "react";
import CardBox from "../../shared/CardBox";
import WithIconCode from "./Code/WithIconCode";

const PaginationWithIcon = () => {
  const [currentPages, setCurrentPages] = useState(1);
  const onPageChanges = (page: number) => setCurrentPages(page);
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Pagination With Icons</h4>
          <WithIconCode />
        </div>
        <div className="flex sm:justify-center">
          <Pagination
            currentPage={currentPages}
            totalPages={100}
            onPageChange={onPageChanges}
            showIcons
          />
        </div>
      </CardBox>
    </div>
  );
};

export default PaginationWithIcon;
