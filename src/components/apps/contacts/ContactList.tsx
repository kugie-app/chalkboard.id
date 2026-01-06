"use client";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { ContactContext } from "@/app/context/Conatactcontext/index";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Alert, Button, Modal } from "flowbite-react";
import SimpleBar from "simplebar-react";
import { ContactType } from "@/app/[locale]/(DashboardLayout)/types/apps/contact";

type ContactListProps = {
  openContact: Dispatch<SetStateAction<boolean>>;
};

function ContactList({ openContact }: ContactListProps) {
  const {
    selectedDepartment,
    contacts,
    deleteContact,
    starredContacts,
    toggleStarred,
    setSelectedContact,
    selectedContact,
    searchTerm,
    openModal,
    setOpenModal,
  }: any = useContext(ContactContext);

  // Handle click on delete contact
  const handleDeleteClick = (contactId: number | any) => {
    deleteContact(contactId);
    setOpenModal(true);
  };

  // Filter contacts based on selected department and search query
  const filterContacts = (
    contacts: ContactType[],
    selectedDepartment: string,
    search: string
  ): ContactType[] => {
    let filteredContacts = [...contacts];

    if (selectedDepartment !== "All") {
      if (selectedDepartment === "Frequent") {
        filteredContacts = filteredContacts.filter(
          (contact) => contact.frequentlycontacted
        );
      } else if (selectedDepartment === "Starred") {
        filteredContacts = filteredContacts.filter((contact) =>
          starredContacts.includes(contact.id)
        );
      } else {
        filteredContacts = filteredContacts.filter(
          (contact) => contact.department === selectedDepartment
        );
      }
    }

    if (searchTerm.trim() !== "") {
      const searchTermLower = search.toLowerCase();
      filteredContacts = filteredContacts.filter(
        (contact) =>
          contact.firstname.toLowerCase().includes(searchTermLower) ||
          contact.lastname.toLowerCase().includes(searchTermLower)
      );
    }

    return filteredContacts;
  };

  // Get filtered contacts based on selected department and search query
  const filteredContacts = filterContacts(
    contacts,
    selectedDepartment,
    searchTerm
  );

  // Handle click on a contact to view details
  const handleContactClick = (contact: ContactType) => {
    setSelectedContact(contact);
  };
  return (
    <>
      <SimpleBar className="max-h-[600px] h-[calc(100vh_-_100px)]">
        <div className="border-right border-color-divider  h-full w-320">
          {selectedDepartment === "Starred" && filteredContacts.length === 0 ? (
            <div className="px-6 pt-3">
              <Alert
                color="lighterror"
                icon={() => (
                  <Icon icon="solar:info-circle-broken" height={18} />
                )}
              >
                <span className="font-medium ms-3">No</span> starred contacts
                available.
              </Alert>
            </div>
          ) : searchTerm !== "" && filteredContacts.length === 0 ? (
            <div className="px-6 pt-3">
              <Alert
                color="lighterror"
                icon={() => (
                  <Icon icon="solar:info-circle-broken" height={18} />
                )}
              >
                <span className="font-medium ms-3">No</span> Contact found
              </Alert>
            </div>
          ) : (
            <div>
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`cursor-pointer flex py-4 px-6 gap-3 items-center group bg-hover  ${selectedContact && selectedContact.id === contact.id
                    ? "bg-lighthover dark:bg-darkmuted"
                    : "bg-transparent"
                    }`}
                  onClick={() => {
                    handleContactClick(contact);
                    openContact(true)
                  }}
                >
                  <Image
                    src={contact.image}
                    width={40}
                    height={40}
                    alt="name"
                    className="rounded-full"
                  />
                  <div>
                    <h6 className="text-sm group-hover:text-primary">
                      {contact.firstname} {contact.lastname}
                    </h6>
                    <p className="text-xs text-ld opacity-80 font-medium mt-0.5">
                      {contact.department}
                    </p>
                  </div>

                  <div className="flex ms-auto">
                    <div
                      className="me-2"
                      onClick={() => toggleStarred(contact.id)}
                    >
                      {starredContacts.includes(contact.id) ? (
                        <Icon icon='solar:star-bold'
                          className="text-warning"
                          height="15"
                          fill="rgb(255, 193, 7)"
                        />
                      ) : (
                        <Icon icon='solar:star-line-duotone' height="15" />
                      )}
                    </div>
                    <div onClick={() => handleDeleteClick(contact.id)}>
                      <Icon icon="solar:trash-bin-2-outline" height={15} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SimpleBar>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <Icon icon="solar:info-circle-broken" className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this contact?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color='primary' onClick={() => setOpenModal(false)}>
                {"Yes"}
              </Button>
              <Button color={'error'} onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ContactList;
