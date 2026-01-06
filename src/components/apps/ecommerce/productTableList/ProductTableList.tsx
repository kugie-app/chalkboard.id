"use client"
import {
  Badge,
  Table,
  Dropdown,
  Checkbox,
  TextInput,
  Button,
  Modal,
  Alert,
  Label,
  Select,
  ModalFooter,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import CardBox from "@/components/shared/CardBox";
import { ProductContext } from "@/app/context/Ecommercecontext/index";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SimpleBar from "simplebar-react";
import { ProductType } from "@/app/[locale]/(DashboardLayout)/types/apps/eCommerce";

const ProductTablelist = () => {
  const {
    filteredAndSortedProducts,
    deleteProduct,
    deleteAllProducts,
    searchProducts,
    updateProduct,
    getProductById,
  }: any = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imageURL, setImageURL] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    searchProducts(event.target.value);
  };

  const handleEdit = (productId: number) => {
    const product = getProductById(productId);

    if (product) {
      setEditedProduct(product);
      setImageURL(product.photo);
      setOpenEditModal(true);
    }
  };

  const handleCloseEditModals = () => {
    setOpenEditModal(false);
    setEditedProduct(null);
    setImageURL("");
  };

  const handleSaveEdit = () => {
    if (editedProduct) {
      const updatedProduct = {
        ...editedProduct,
        photo: imageURL,
        created: selectedDate || editedProduct.created,
      };
      updateProduct(editedProduct.id.toString(), updatedProduct);
      handleCloseEditModals();
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(
        filteredAndSortedProducts.map((product: { id: any }) => product.id)
      );
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId: number) => {
    const index = selectedProducts.indexOf(productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((id: number) => id !== productId)
      );
    }
  };

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
      setShowAlert(true); // Show alert after adding contact
    } else {
      setOpenDeleteDialog(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedProducts.length > 0) {
      if (selectedProducts.length === filteredAndSortedProducts.length) {
        deleteAllProducts();
      } else {
        selectedProducts.forEach((productId: number) => {
          deleteProduct(productId);
        });
      }
      setSelectedProducts([]);
      setSelectAll(false);
    }
    setOpenDeleteDialog(false);
  };

  const handleDateChange = (created: Date | null) => {
    setSelectedDate(created);
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, created: created || new Date() });
    }
  };

  return (
    <>
      <CardBox>
        {/* Search  */}
        <div className="flex gap-3 justify-between items-center mb-5">
          <TextInput
            id="search"
            placeholder="Search Products"
            className="form-control w-full sm:max-w-60 max-w-full"
            sizing="md"
            required
            onChange={handleSearch}
            value={search}
            icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
          />
          <div className="flex gap-4">
            {selectAll ? (
              <Button color={"lightprimary"} className="btn-circle p-0">
                <Icon
                  icon="solar:trash-bin-minimalistic-outline"
                  height={18}
                  onClick={handleDelete}
                />
              </Button>
            ) : (
              <Button color={"lightprimary"} className="btn-circle p-0">
                <Icon icon="solar:filter-outline" height={18} />
              </Button>
            )}
          </div>
        </div>
        {/* Table */}
        <SimpleBar className="max-h-[580px]">
          <div className="border rounded-md border-ld overflow-x-auto">
            <Table className="">
              <Table.Head>
                <Table.HeadCell className="text-base font-semibold py-3">
                  <Checkbox
                    className="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Products
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Date
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Price
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Action
                </Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-border dark:divide-darkborder ">
                {filteredAndSortedProducts.map(
                  (
                    item: {
                      id: number;
                      photo: string;
                      title:
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
                      category:
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
                      created: string | number | Date;
                      stock: boolean;
                      price:
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
                      <Table.Cell className="whitespace-nowrap">
                        <Checkbox
                          className="checkbox"
                          onChange={() => toggleSelectProduct(item.id)}
                          checked={selectedProducts.includes(item.id)}
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap lg:min-w-auto min-w-[250px]">
                        <div className="flex  gap-3 items-center">
                          <img
                            src={item.photo}
                            alt="icon"
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-full"
                          />
                          <div className="text-no-wrap">
                            <h6 className="text-base">{item.title}</h6>
                            <p className="text-sm text-darklink dark:text-bodytext">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <p className="text-sm text-darklink dark:text-bodytext font-medium">
                          {format(new Date(item.created), "E, MMM d yyyy")}
                        </p>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <div className="flex gap-2 text-sm items-center text-darklink dark:text-bodytext font-medium">
                          {item.stock ? (
                            <Badge color={"success"} className="h-2 w-2 p-0"></Badge>
                          ) : (
                            <Badge color={"error"} className="h-2 w-2 p-0"></Badge>
                          )}
                          {item.stock ? "InStock" : "Out of Stock"}
                        </div>
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap">
                        <h5 className="text-base">${item.price}</h5>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        <Dropdown
                          label=""
                          dismissOnClick={false}
                          renderTrigger={() => (
                            <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                              <HiOutlineDotsVertical size={22} />
                            </span>
                          )}
                        >
                          <Dropdown.Item
                            className="flex gap-3"
                            onClick={() => handleEdit(item.id)}
                          >
                            <Icon
                              icon="solar:pen-new-square-broken"
                              height={18}
                            />
                            <span>Edit</span>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={handleDelete}
                            className="flex gap-3"
                          >
                            <Icon
                              icon="solar:trash-bin-minimalistic-outline"
                              height={18}
                            />
                            <span>Delete</span>
                          </Dropdown.Item>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  )
                )}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar>
      </CardBox>
      <Modal
        show={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title="Delete Confirmation"
        size="md"
      >
        <p className="text-center text-ld text-lg my-6">
          Are you sure you want to delete selected products?
        </p>
        <Modal.Footer className="flex justify-center">
          <Button color={"error"} onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button onClick={handleCloseDeleteDialog} color={"lighterror"}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal
        show={openEditModal}
        onClose={handleCloseEditModals}
        title="Edit Product"
        size="lg"
      >
        <Modal.Header>Edit Item</Modal.Header>
        <Modal.Body className="pt-0">
          <div className="grid grid-cols-12 gap-6">
            {editedProduct && (
              <>
                <div className="col-span-12 lg:col-span-6">
                  <Label
                    htmlFor="ttl"
                    value="Title"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    id="ttl"
                    value={editedProduct.title}
                    className="form-control"
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-12  lg:col-span-6">
                  <Label
                    htmlFor="price"
                    value="Price"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    id="price"
                    className="form-control"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-12  lg:col-span-6">
                  <Label
                    htmlFor="stck"
                    value="Stock"
                    className="mb-2 block capitalize"
                  />
                  <Select
                    id="stck"
                    className="select-md"
                    value={editedProduct.stock ? "In Stock" : "Out of Stock"}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        stock: e.target.value === "In Stock",
                      })
                    }
                    required
                  >
                    <option value="In Stock">IN Stock</option>
                    <option value="Out of Stock">Out Stock</option>
                  </Select>
                </div>
                <div className="col-span-12  lg:col-span-6">
                  <Label
                    htmlFor="dt"
                    value="Date"
                    className="mb-2 block capitalize"
                  />
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    className="form-control-input w-full max-w-full py-[10px]"
                    value={editedProduct.created}
                    id="dt"
                  />
                </div>
                <div className="col-span-12  lg:col-span-6">
                  <Label
                    htmlFor="img"
                    value="Image URL"
                    className="mb-2 block capitalize"
                  />
                  <TextInput
                    id="img"
                    className="form-control"
                    placeholder="Paste image URL"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </div>

                <div className="col-span-12 ">
                  <Label htmlFor="imgPreview" value="Image Preview" className="mb-2 block capitalize" />
                  {imageURL && (
                    <img
                      id="imgPreview"
                      src={imageURL}
                      alt="Preview"
                      className="w-full max-w-[200px] h-auto object-cover rounded-lg"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <ModalFooter>
          <Button color={"primary"} onClick={handleSaveEdit}>
            Save
          </Button>
          <Button onClick={handleCloseEditModals} color={"lighterror"}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {showAlert && (
        <Alert
          color="warning"
          rounded
          className="fixed mx-auto start-0 end-0 top-3 w-fit z-[50]"
          icon={() => (
            <Icon
              icon="solar:archive-minimalistic-broken"
              className=""
              height={22}
            />
          )}
        >
          <span className="ms-2">Please select products to delete.</span>
        </Alert>
      )}
    </>
  );
};

export default ProductTablelist;


