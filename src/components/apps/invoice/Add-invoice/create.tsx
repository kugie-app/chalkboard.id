"use client"

import React, { useState, useContext, useEffect } from "react";
import { InvoiceContext } from "@/app/context/InvoiceContext";
import { Alert, Button, Label, Select, TextInput, Table, Tooltip } from "flowbite-react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { format, isValid } from "date-fns";

function CreateInvoice() {
  const { addInvoice, invoices } = useContext(InvoiceContext);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: 0,
    billFrom: "",
    billTo: "",
    totalCost: 0,
    status: "Pending",
    billFromAddress: "",
    billToAddress: "",
    orders: [{ itemName: "", unitPrice: "", units: "", unitTotalPrice: 0 }],
    vat: 0,
    grandTotal: 0,
    subtotal: 0,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (invoices.length > 0) {
      const lastId = invoices[invoices.length - 1].id;
      setFormData((prevData: any) => ({
        ...prevData,
        id: lastId + 1
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        id: 1
      }));
    }
  }, [invoices]);


  const calculateTotals = (orders: any[]) => {
    let subtotal = 0;

    orders.forEach(order => {
      const unitPrice = parseFloat(order.unitPrice) || 0;
      const units = parseInt(order.units) || 0;
      const totalCost = unitPrice * units;

      subtotal += totalCost;
      order.unitTotalPrice = totalCost;
    });

    const vat = subtotal * 0.1;
    const grandTotal = subtotal + vat;

    return { subtotal, vat, grandTotal };
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => {
      const newFormData = { ...prevData, [name]: value };
      const totals = calculateTotals(newFormData.orders);
      return {
        ...newFormData,
        ...totals,
      };
    });
  };

  const handleOrderChange = (index: number, field: string, value: string) => {
    setFormData(prevData => {
      const updatedOrders = [...prevData.orders];
      updatedOrders[index] = {
        ...updatedOrders[index],
        [field]: value,
      };
      const totals = calculateTotals(updatedOrders);
      return {
        ...prevData,
        orders: updatedOrders,
        ...totals,
      };
    });
  };

  const handleAddItem = () => {
    setFormData(prevData => {
      const updatedOrders = [...prevData.orders, { itemName: "", unitPrice: "", units: "", unitTotalPrice: 0 }];
      const totals = calculateTotals(updatedOrders);
      return {
        ...prevData,
        orders: updatedOrders,
        ...totals,
      };
    });
  };

  const handleDeleteItem = (index: number) => {
    setFormData(prevData => {
      const updatedOrders = prevData.orders.filter((_, i) => i !== index);
      const totals = calculateTotals(updatedOrders);
      return {
        ...prevData,
        orders: updatedOrders,
        ...totals,
      };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await addInvoice(formData);
      setFormData({
        id: 0,
        billFrom: "",
        billTo: "",
        totalCost: 0,
        status: "Pending",
        billFromAddress: "",
        billToAddress: "",
        orders: [{ itemName: "", unitPrice: "", units: "", unitTotalPrice: 0 }],
        vat: 0,
        grandTotal: 0,
        subtotal: 0,
        date: new Date().toISOString().split('T')[0],
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      router.push('/apps/invoice/list');
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  }

  const parsedDate = isValid(new Date(formData.date)) ? new Date(formData.date) : new Date();
  const formattedOrderDate = format(parsedDate, "EEEE, MMMM dd, yyyy");

  return (
    <div>
      <h2 className="text-xl mb-6">Add New Invoice Details</h2>
      <p>ID: {formData.id}</p>
      <p>Date: {formattedOrderDate}</p>
      <form>
        <div className="bg-lightgray dark:bg-gray-800/70 p-6 my-6 rounded-md">

          <div className="grid grid-cols-12 gap-6">

            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="billFrom" value="Bill From" />
              </div>
              <TextInput
                id="billFrom"
                name="billFrom"
                value={formData.billFrom}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="billTo" value="Bill To" />
              </div>
              <TextInput
                id="billTo"
                name="billTo"
                value={formData.billTo}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>

            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="billFromAddress" value="From Address" />
              </div>
              <TextInput
                id="billFromAddress"
                name="billFromAddress"
                value={formData.billFromAddress}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="billToAddress" value="Bill To Address" />
              </div>
              <TextInput
                id="billToAddress"
                name="billToAddress"
                value={formData.billToAddress}
                onChange={handleChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="status" value="Status" />
              </div>
              <Select
                className="select-md"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </Select>
            </div>
          </div>
        </div>
        {/* Orders Table */}
        <div className="mt-6 overflow-x-auto">
          <Table className="mt-4">
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Item Name</Table.HeadCell>
              <Table.HeadCell>Unit Price</Table.HeadCell>
              <Table.HeadCell>Units</Table.HeadCell>
              <Table.HeadCell>Total Cost</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {/* Order Rows */}
              {formData.orders.map((order, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap">
                    <Tooltip content="Add Item" placement="bottom">
                      <Button
                        className="p-0 mb-2 bg-lightprimary text-primary h-8 w-8 rounded-full flex justify-center items-center p-0  hover:bg-primary hover:text-white"
                        onClick={handleAddItem}
                      >
                        <Icon icon="mdi:plus-circle" height={18} />
                      </Button>

                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap min-w-44">
                    <TextInput
                      type="text"
                      value={order.itemName}
                      placeholder="Item Name"
                      onChange={(e) =>
                        handleOrderChange(index, "itemName", e.target.value)
                      }
                      className="form-control"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap min-w-44">
                    <TextInput
                      type="number"
                      value={order.unitPrice}
                      placeholder="Unit Price"
                      onChange={(e) =>
                        handleOrderChange(index, "unitPrice", e.target.value)
                      }
                      className="form-control"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap min-w-44">
                    <TextInput
                      type="number"
                      value={order.units}
                      placeholder="Units"
                      onChange={(e) =>
                        handleOrderChange(index, "units", e.target.value)
                      }
                      className="form-control"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap min-w-32">
                    {order.unitTotalPrice}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap"> </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <Tooltip content="Delete Item" placement="bottom">
                      <Button
                        color={"lighterror"}
                        className="btn-circle p-0 mb-2"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <Icon
                          icon="solar:trash-bin-minimalistic-outline"
                          height={18}
                        />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        {/* Totals */}
        <div className="border-t border-ld  py-5 px-4 ">
          <div className="flex justify-end mb-3">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full opacity-80">Sub Total:</h2>
              <h3 className="ms-auto text-base">{formData.subtotal}</h3>
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full opacity-80">Vat:</h2>
              <h3 className="ms-auto text-base">{formData.vat}</h3>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full opacity-80">Grand Total:</h2>
              <h3 className="ms-auto text-base">{formData.grandTotal}</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-end gap-3 mt-2">
            <Button color="primary" className="mt-6" onClick={handleSubmit}>
              Create Invoice
            </Button>

            <Button color={"error"} className="mt-6" onClick={() => { router.push('/apps/invoice/list'); }}>
              Cancel
            </Button>
          </div>
        </div>
      </form >
      {showAlert && (
        <Alert color="warning" rounded className="fixed top-3">
          Invoice added successfully.
        </Alert>
      )
      }
    </div >
  );
}

export default CreateInvoice;


