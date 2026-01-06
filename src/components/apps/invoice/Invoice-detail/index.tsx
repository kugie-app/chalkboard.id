"use client";
import React, { useContext, useEffect, useState } from "react";
import { InvoiceContext } from "@/app/context/InvoiceContext/index";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge, Button, Table } from "flowbite-react";
import { format, isValid, parseISO } from "date-fns";
import FullLogo from "@/components/layout/shared/logo/FullLogo";

const InvoiceDetail = () => {
  const { invoices } = useContext(InvoiceContext);
  const [selectedInvoice, setSelectedInvoice]: any = useState(null);

  useEffect(() => {
    // Set the first invoice as the default selected invoice initially
    if (invoices.length > 0) {
      setSelectedInvoice(invoices[0]);
    }
  }, [invoices]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the invoice that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const invoice = invoices.find(
        (p: { billFrom: string }) => p.billFrom === getTitle
      );
      if (invoice) {
        setSelectedInvoice(invoice);
      }
    }
  }, [getTitle, invoices]);

  if (!selectedInvoice) {
    return <div>Loading...</div>;
  }

  const orderDate = selectedInvoice.orderDate
    ? (isValid(parseISO(selectedInvoice.orderDate))
      ? format(parseISO(selectedInvoice.orderDate), "EEEE, MMMM dd, yyyy")
      : "Invalid Date")
    : format(new Date(), "EEEE, MMMM dd, yyyy");
  return (
    <>
      <div className="sm:flex justify-between items-start mb-6">
        <FullLogo />
        <div className="md:text-end md:mt-0 mt-5">
          <Badge color={"success"}>{selectedInvoice.status}</Badge>
          <h3 className="items-center mt-1 text-xl"># {selectedInvoice.id}</h3>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="md:col-span-6 col-span-12">
          <h6 className="text-base">Bill From</h6>
          <p> {selectedInvoice.billFrom}</p>
          <p>{selectedInvoice.billFromEmail}</p>
          <p>{selectedInvoice.billFromAddress}</p>
          <p>{selectedInvoice.billFromPhone}</p>
        </div>
        <div className="md:col-span-6 col-span-12 flex md:justify-end">
          <div className="md:text-right">
            <h6 className="text-base">Bill To</h6>
            <p> {selectedInvoice.billTo}</p>
            <p> {selectedInvoice.billToEmail}</p>
            <p>{selectedInvoice.billToAddress}</p>
            <p>{selectedInvoice.billToPhone}</p>
            {/* <p>Total Cost: {selectedInvoice.totalCost}</p>
            <p>Status: {selectedInvoice.status}</p> */}
            <p>OrderDate:  {orderDate}</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Item Name</Table.HeadCell>
            <Table.HeadCell>Unit Price</Table.HeadCell>
            <Table.HeadCell>Unit</Table.HeadCell>
            <Table.HeadCell className="text-end">Total Cost</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder ">
            {selectedInvoice.orders.map(
              (
                order: {
                  itemName:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                  unitPrice:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                  units:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                  unitTotalPrice:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<React.AwaitedReactNode>
                  | null
                  | undefined;
                },
                index: React.Key | null | undefined
              ) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap ">
                    <h5 className="text-sm">{order.itemName}</h5>
                  </Table.Cell>
                  <Table.Cell className="text-ld">{order.unitPrice}</Table.Cell>
                  <Table.Cell className="text-ld">{order.units}</Table.Cell>
                  <Table.Cell className="text-end">
                    <h4 className="text-sm">{order.unitTotalPrice}</h4>
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
        <div className="border-t border-ld  py-5 px-4">
          <div className="flex justify-end mb-3">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full opacity-80">Sub Total:</h2>
              <h3 className="ms-auto text-base">{selectedInvoice.totalCost}</h3>
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full opacity-80">Vat:</h2>
              <h3 className="ms-auto text-base">{selectedInvoice.vat}</h3>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full opacity-80">Grand Total:</h2>
              <h3 className="ms-auto text-base">{selectedInvoice.grandTotal}</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <Button color={"warning"}>
            <Link href={`/apps/invoice/edit/${selectedInvoice.billFrom}`}>
              Edit Invoice
            </Link>
          </Button>
          <Button color="primary">
            <Link href="/apps/invoice/list">Back to Invoice List</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
export default InvoiceDetail;
