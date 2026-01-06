"use client";
import React from "react";
import * as basicTable from "@/components/tables/tableData";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/Default-Ui/table";
import { Badge } from "../../shadcn-ui/Default-Ui/badge";

const BasicTable = () => {
  return (
    <div className="border rounded-md border-ld overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {basicTable.basicTableData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="whitespace-nowrap">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.avatar}
                      alt="icon"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="truncat line-clamp-2 max-w-56">
                      <h6 className="text-base">{item.name}</h6>
                      <p className="text-sm text-bodytext">{item.post}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {" "}
                  <p className="text-bodytext text-base">{item.pname}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex ">
                    {item.teams.map((teamtbl, index) => (
                      <div className="-ms-2" key={index}>
                        <div
                          className={`bg-${teamtbl.color} text-white border-2 border-white dark:border-darkborder  h-10 w-10 flex justify-center items-center text-xl font-medium text-dark dark:text-white rounded-full`}
                        >
                          {teamtbl.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.statuscolor == "success" ? (
                    <Badge variant={`${item.statuscolor}`}>{item.status}</Badge>
                  ) : item.statuscolor == "error" ? (
                    <Badge variant={`${item.statuscolor}`}>{item.status}</Badge>
                  ) : item.statuscolor == "warning" ? (
                    <Badge variant={`${item.statuscolor}`}>{item.status}</Badge>
                  ) : item.statuscolor == "primary" ? (
                    <Badge variant={`${item.statuscolor}`}>{item.status}</Badge>
                  ) : null}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <h6 className="text-base">{item.budget}</h6>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BasicTable;
