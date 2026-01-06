"use client";
import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import {
  Button,
  HR,
  Select,
  TextInput,
  Label,
  Modal,
  Alert,
  Tooltip,
  Drawer,
} from "flowbite-react";

import { ContactContext } from "@/app/context/Conatactcontext/index";
import { CustomizerContext } from "@/app/context/CustomizerContext";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";
import { ContactType } from "@/app/[locale]/(DashboardLayout)/types/apps/contact";

// Define the props interface
interface ContactListItemProps {
  openContactValue: boolean;
  onCloseContact: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({
  openContactValue,
  onCloseContact,
}) => {
  const {
    selectedContact,
    deleteContact,
    updateContact,
    starredContacts,
    toggleStarred,
    openModal,
    setOpenModal,
  }: any = useContext(ContactContext);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactType | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const { activeDir } = useContext(CustomizerContext);



  useEffect(() => {
    setFormData(selectedContact);
  }, [selectedContact]);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = () => {
    if (formData) {
      updateContact(formData);
    }
    setIsEditMode(false);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData((prevData) => ({
        ...(prevData as ContactType),
        [name]: value,
      }));
    }
  };

  const handleDeleteClick = () => {
    if (selectedContact) {
      deleteContact(selectedContact.id);
      setOpenModal(true);
    }
  };

  const handleDepartmentChange = (event: any) => {
    const departmentValue = event.target.value as string;
    if (formData) {
      setFormData((prevData) => ({
        ...(prevData as ContactType),
        department: departmentValue,
      }));
    }
  };

  if (!selectedContact) {
    return (
      <div className="w-full text-center p-5">
        <div className="px-6 pt-3">
          <Alert
            color="lighterror"
            icon={() => <Icon icon="solar:info-circle-broken" height={18} />}
          >
            <span className="ps-2 text-base"> Please Select a Contact</span>
          </Alert>
        </div>
        <h4></h4>
        <Image
          src="/images/backgrounds/emailSv.png"
          alt="Email Icon"
          width="250"
          height="250"
          className="mx-auto"
        />
      </div>
    );
  }

  return (
    <>
      <Drawer
        open={openContactValue}
        backdrop={false}
        onClose={onCloseContact}
        position={`${activeDir === "rtl" ? "left" : "right"}`}
        className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent w-full lg:z-[0]"
      >
        <div className="lg:hidden block p-6 pb-2">
          <Button
            color={"outlineprimary"}
            onClick={onCloseContact}
            className="py-0"
          >
            <Icon icon="solar:round-arrow-left-linear" height={18}></Icon>Back
          </Button>
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center py-4 px-5">
            <h5 className="card-title">Contact Details</h5>
            <div className="ms-auto flex gap-1 items-center">
              <Tooltip content={"important"}>
                <div
                  className="btn-circle-hover cursor-pointer"
                  onClick={() => toggleStarred(selectedContact.id)}
                >
                  {starredContacts.includes(selectedContact.id) ? (
                    <Icon
                      icon="solar:star-bold"
                      className="text-warning"
                      height="18"
                    />
                  ) : (
                    <Icon icon="solar:star-line-duotone" height="18" />
                  )}
                </div>
              </Tooltip>
              <Tooltip content={!isEditMode ? "Edit" : "Save"}>
                <div
                  onClick={isEditMode ? handleSaveClick : handleEditClick}
                  className="btn-circle-hover cursor-pointer"
                >
                  {isEditMode ? (
                    <Icon icon="solar:gallery-check-broken" height="18" />
                  ) : (
                    <Icon icon="solar:pen-2-outline" height="18" />
                  )}
                </div>
              </Tooltip>
              <Tooltip content={"Delete"}>
                <div
                  onClick={handleDeleteClick}
                  className="btn-circle-hover cursor-pointer"
                >
                  <Icon
                    icon="solar:trash-bin-minimalistic-outline"
                    height="18"
                  />
                </div>
              </Tooltip>
            </div>
          </div>

          <HR className="my-0" />

          <SimpleBar className="max-h-[600px] h-[calc(100vh_-_100px)]">
            <div className="py-5 ">
              {isEditMode && formData ? (
                <div className="pt-1 px-5">
                  {[
                    {
                      id: 1,
                      title: "First Name",
                      value: formData.firstname,
                      name: "firstname",
                    },
                    {
                      id: 2,
                      title: "Last Name",
                      value: formData.lastname,
                      name: "lastname",
                    },
                    {
                      id: 3,
                      title: "Company",
                      value: formData.company,
                      name: "company",
                    },
                    {
                      id: 4,
                      title: "Department",
                      value: formData.department,
                      name: "department",
                    },
                    {
                      id: 5,
                      title: "Email",
                      value: formData.email,
                      name: "email",
                    },
                    {
                      id: 6,
                      title: "Phone",
                      value: formData.phone,
                      name: "phone",
                    },
                    {
                      id: 7,
                      title: "Address",
                      value: formData.address,
                      name: "address",
                    },
                    {
                      id: 8,
                      title: "Notes",
                      value: formData.notes,
                      name: "notes",
                    },
                  ].map((data) => (
                    <div key={data.id} className="flex flex-col gap-5">
                      <div>
                        <Label className="font-semibold block mb-2">
                          {data.title}
                        </Label>
                        {data.name !== "department" && (
                          <TextInput
                            type="text"
                            className="form-control"
                            name={data.name}
                            value={data.value}
                            onChange={handleInputChange}
                          />
                        )}

                        {data.name === "department" && (
                          <>
                            <div className="mb-2 block">
                              <Label htmlFor="department" />
                            </div>
                            <Select
                              id="countries"
                              className="select-md"
                              value={formData.department}
                              onChange={handleDepartmentChange}
                              required
                            >
                              <option>Sales</option>
                              <option>Engineering</option>
                              <option>HR</option>
                            </Select>
                          </>
                        )}
                      </div>
                      <div></div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <Button color="primary" onClick={handleSaveClick}>
                      Save Contact
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="p-5">
                    <div className="flex gap-3 items-center">
                      <Image
                        alt={`${selectedContact.firstname} ${selectedContact.lastname}`}
                        src={selectedContact.image}
                        height={70}
                        width={70}
                        className="rounded-full"
                      />
                      <div>
                        <h6 className="text-base">
                          {selectedContact.firstname} {selectedContact.lastname}
                        </h6>
                        <p className="text-darklink dark:text-bodytext text-sm">
                          {selectedContact.department}
                        </p>
                        <p className="text-darklink dark:text-bodytext text-sm">
                          {selectedContact.company}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5 mt-8">
                      <div className="col-span-4">
                        <p className="text-darklink dark:text-bodytext text-sm">Phone Number</p>
                        <h5 className="font-semibold mb-0.5">
                          {selectedContact.phone}
                        </h5>
                      </div>
                      <div className="col-span-8">
                        <p className="text-darklink dark:text-bodytext text-sm">Email address</p>
                        <h5 className="font-semibold mb-0.5">
                          {selectedContact.email}
                        </h5>
                      </div>
                      <div className="col-span-12">
                        <p className="text-darklink dark:text-bodytext text-sm">Address</p>
                        <h5 className="font-semibold mb-0.5">
                          {selectedContact.address}
                        </h5>
                      </div>
                      <div className="col-span-4">
                        <p className="text-darklink dark:text-bodytext text-sm">Department</p>
                        <h5 className="font-semibold mb-0.5">
                          {selectedContact.department}
                        </h5>
                      </div>
                      <div className="col-span-8">
                        <p className="text-darklink dark:text-bodytext text-sm">Company</p>
                        <h5 className="font-semibold mb-0.5">
                          {selectedContact.company}
                        </h5>
                      </div>
                      <div className="col-span-12">
                        <p className="text-darklink dark:text-bodytext text-sm mb-1">Notes</p>
                        <h5 className="font-medium mb-0.5">
                          {selectedContact.notes}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <HR className="my-2" />
                  <div className="py-4 px-5 gap-2 flex">
                    <Button color={"primary"} onClick={handleEditClick} className="rounded-xl">
                      Edit
                    </Button>
                    <Button color={"lighterror"} onClick={handleDeleteClick} className="rounded-xl">
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SimpleBar>
        </div>
      </Drawer>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <Icon
              icon="solar:info-circle-broken"
              className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
            />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this contact?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color={"error"} onClick={() => setOpenModal(false)}>
                {"Yes"}
              </Button>
              <Button color={"lighterror"} onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {showAlert && (
        <Alert
          color="success"
          rounded
          className="fixed mx-auto start-0 end-0 top-3 w-fit"
          icon={() => (
            <Icon
              icon="solar:archive-minimalistic-broken"
              className="text-white"
              height={22}
            />
          )}
        >
          <span className="ms-2 font-medium">
            Contact updated successfully.
          </span>
        </Alert>
      )}
    </>
  );
};

export default ContactListItem;
