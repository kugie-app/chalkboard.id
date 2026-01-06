"use client";
import { Badge, Dropdown, Table } from "flowbite-react";
import React from "react";
import * as basicTable2 from "@/components/tables/tableData";
import Image from "next/image";
import { IconDotsVertical } from "@tabler/icons-react";
import { Icon } from "@iconify/react";

const BasicTable2 = () => {
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
              User
            </Table.HeadCell>
            <Table.HeadCell className="text-base font-semibold py-3">
              Project Name
            </Table.HeadCell>
            <Table.HeadCell className="text-base font-semibold py-3">
              Users
            </Table.HeadCell>
            <Table.HeadCell className="text-base font-semibold py-3">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="text-base font-semibold py-3"></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder ">
            {basicTable2.basicTableData2.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell className="whitespace-nowrap">
                  <div className="flex gap-3 items-center">
                    <Image
                      src={item.avatar}
                      alt="icon"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="truncat line-clamp-2  max-w-56">
                      <h6 className="text-base">{item.name}</h6>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  <p className="text-bodytext text-base">{item.post}</p>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  <div className="flex ">
                    {item.users.map((user, index) => (
                      <div className="-ms-2" key={index}>
                        <Image
                          src={user.icon}
                          className="border-2 border-white dark:border-darkborder rounded-full h-10 w-10 max-w-none"
                          alt="icon"
                        />
                      </div>
                    ))}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  <Badge color={`light${item.statuscolor}`} className="capitalize">
                    {item.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                        <IconDotsVertical size={22} />
                      </span>
                    )}
                  >
                    {tableActionData.map((items, index) => (
                      <Dropdown.Item key={index} className="flex gap-3">
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

export default BasicTable2;
