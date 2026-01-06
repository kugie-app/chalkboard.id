"use client";
import { Badge, Table } from "flowbite-react";
import React from "react";
import * as basicTable from "@/components/tables/tableData";
import Image from "next/image";

const BasicTable1 = () => {
  return (
    <>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="">
            <Table.Head>
              <Table.HeadCell className="text-base font-semibold py-3">
                User
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">
                Project Name
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">
              Team
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">
                Status
              </Table.HeadCell>
              <Table.HeadCell className="text-base font-semibold py-3">
                Budget
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder ">
              {basicTable.basicTableData.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap">
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
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <p className="text-bodytext text-base">{item.pname}</p>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
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
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <Badge
                      color={`light${item.statuscolor}`}
                      className="capitalize"
                    >
                      {item.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <h6 className="text-base">{item.budget}</h6>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default BasicTable1;
