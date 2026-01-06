import React, { createContext, useState, useEffect, ReactNode } from 'react';

import useSWR from 'swr';
import { deleteFetcher, getFetcher, postFetcher, putFetcher } from '@/app/api/globalFetcher';
import { ContactType } from '@/app/[locale]/(DashboardLayout)/types/apps/contact';

// Define the shape of the context
export interface ContactContextType {
  selectedDepartment: string;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>;
  contacts: ContactType[];
  setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
  starredContacts: number[];
  setStarredContacts: React.Dispatch<React.SetStateAction<number[]>>;
  selectedContact: ContactType | null;
  setSelectedContact: React.Dispatch<React.SetStateAction<ContactType | null>>;
  addContact: (newContact: ContactType) => void;
  deleteContact: (contactId: number) => void;
  updateContact: (updatedContact: ContactType) => void;
  selectContact: (contact: ContactType) => void;
  toggleStarred: (contactId: number) => void;
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
  openModal: boolean;
  setOpenModal: (collapse: boolean) => void;
  loading:boolean;
  error:any;

}
export const ContactContext = createContext<ContactContextType | any>(undefined);
export const ContactContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [starredContacts, setStarredContacts] = useState<number[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);



  // Fetch contacts data from the API on component mount
  const {data:contactsData,isLoading:isContactsLoading,error:contactsError,mutate} = useSWR('/api/contacts',getFetcher);

  useEffect(() => {
    
    if(contactsData){
      const allContacts = contactsData.data;
      setContacts(allContacts);
      if(contacts.length===0){
        const initialStarredContacts = allContacts.filter((contact: { starred: any; }) => contact.starred).map((contact: { id: any; }) => contact.id);
        setStarredContacts(initialStarredContacts);
        setSelectedContact(allContacts[0]);
      }

    }else if(contactsError){
      setLoading(isContactsLoading);
      setError(contactsError);
    }else{
      setLoading(isContactsLoading);
    }

  }, [contactsData,contactsError]);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  // Function to add Contact
  const addContact = async (newContact: ContactType) => {
    try{
      await mutate(postFetcher("/api/contacts",newContact));
    }catch(error){
     console.log("Failed to add contact",error)
    }
 };


  // Function to delete a contact
  const deleteContact = async (contactId: string | number) => {
    try {
       await mutate(deleteFetcher("/api/contacts",{ data: { contactId } }));
      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };
  // Function to update a contact
  const updateContact = async (updatedContact: React.SetStateAction<ContactType | null>) => {
    try {
       await mutate(putFetcher("/api/contacts",updatedContact));
       setSelectedContact(updatedContact);
    } catch (error) {
      console.error('Failed to update contact:', error);
    }
  };
  // Function to select a contact
  const selectContact = (contact: ContactType) => {
    setSelectedContact(contact);
  };

  // Function to toggle the starred status of a contact
  const toggleStarred = (contactId: number) => {
    if (starredContacts.includes(contactId)) {
      setStarredContacts(prevStarred => prevStarred.filter(id => id !== contactId));
    } else {
      setStarredContacts(prevStarred => [...prevStarred, contactId]);
    }
  };

  // Value provided by the context provider
  const contextValue: ContactContextType = {
    selectedDepartment,
    setSelectedDepartment,
    contacts,
    setContacts,
    starredContacts,
    setStarredContacts,
    selectedContact,
    setSelectedContact,
    addContact,
    deleteContact,
    updateContact,
    error,
    loading,
    selectContact,
    toggleStarred,
    searchTerm,
    updateSearchTerm,
    openModal, setOpenModal
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
