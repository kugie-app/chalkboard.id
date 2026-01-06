"use client";
import { Badge, Table, Dropdown } from "flowbite-react";
import React from "react";
import * as basicTable5 from "@/components/tables/tableData";
import Image from "next/image";
import {
  IconDots,
} from "@tabler/icons-react";
import { Icon } from "@iconify/react";

const BasicTable5 = () => {
  /*Table Action*/
  const tableActionData = [
    {
      icon: "tabler:plus",
      listtitle: "Add",
    },
    {
      icon: "tabler:edit",
      listtitle: "Edit",
    },
    {
      icon: "tabler:trash",
      listtitle: "Delete",
    },
  ];
  return (
    <>
      <div className="border rounded-md border-ld overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="">
          <Table.Head>
            <Table.HeadCell className="text-base font-semibold py-3">
              Authors
            </Table.HeadCell>
            <Table.HeadCell className="text-base font-semibold py-3">
              Courses
            </Table.HeadCell>
            <Table.HeadCell className="text-base font-semibold py-3">
              Users
            </Table.HeadCell>
            <Table.HeadCell className="text-base font-semibold py-3"></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder ">
            {basicTable5.basicTableData5.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell className="whitespace-nowrap">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.avatar}
                      alt="icon"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="truncat line-clamp-2  max-w-56">
                      <h6 className="text-base">{item.name}</h6>
                      <p className="text-sm text-bodytext">{item.handle}</p>
                    </div>
                  </div>
                </Table.Cell>
                
                <Table.Cell className="whitespace-nowrap">
                  <div className="flex gap-2">
                    {item.courses.map((crs, index) => (
                      <Badge
                        key={index}
                        color={`light${crs.statuscolor}`}
                        className="capitalize"
                      >
                        {crs.status}
                      </Badge>
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  <p className="text-bodytext text-sm">{item.users}</p>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                        <IconDots size={22} />
                      </span>
                    )}
                  >
                    {tableActionData.map((items, index1) => (
                      <Dropdown.Item key={index1} className="flex gap-3">
                        <Icon icon={`${items.icon}`} height={18} />
                        <span>{items.listtitle}</span>
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
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

export default BasicTable5;
