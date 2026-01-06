"use client"
import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { EmailType } from '@/app/[locale]/(DashboardLayout)/types/apps/email';
import useSWR from 'swr';
import { deleteFetcher, getFetcher } from '@/app/api/globalFetcher';

interface EmailContextType {
  emails: EmailType[];
  selectedEmail: EmailType | null;
  setSelectedEmail: (email: EmailType | null) => void;
  deleteEmail: (emailId: number) => void;
  toggleStar: (emailId: number) => void;
  toggleImportant: (emailId: number) => void;
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string,
  searchQuery: string,
  loading:boolean,
  error:any,
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const initialEmailContext: EmailContextType = {
  emails: [],
  selectedEmail: null,
  filter: 'inbox',
  searchQuery: '',
  loading:true,
  error:null,
  setSelectedEmail: () => { },
  deleteEmail: () => { },
  toggleStar: () => { },
  toggleImportant: () => { },
  setFilter: () => { },
  setSearchQuery: () => { },
};

export const EmailContext = createContext<EmailContextType>(initialEmailContext);

export const EmailContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<EmailType[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);
  const [filter, setFilter] = useState<string>('inbox');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [ loading , setLoading] = useState<boolean>(true);
  const [ error , setError] = useState<any>(null);

   const {data:emailData , isLoading:isEmailLoading , error:emailError, mutate} = useSWR("/api/email", getFetcher);

  useEffect(() => {
    if(emailData){
      setEmails(emailData.data);
      if(emails?.length==0){
        setSelectedEmail(emailData.data[0]);
      }
      setLoading(isEmailLoading);
    }else if(emailError){
      setError(emailError);
      setLoading(isEmailLoading);
    }else{
      setLoading(isEmailLoading);
    }
  }, [emailData,emailError]);

  const deleteEmail = async (emailId: number) => {
    try {
      // Make DELETE request to mock API endpoint
      const rakkt = await mutate(deleteFetcher('/api/email', { emailId  }));
      if (selectedEmail && selectedEmail.id === emailId) {
        setSelectedEmail(null);
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const toggleStar = (emailId: number) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    );

    if (selectedEmail?.id === emailId) {
      setSelectedEmail((prevEmail: any) => ({
        ...(prevEmail as EmailType),
        starred: !(prevEmail as EmailType).starred
      }));
    }
  };

  const toggleImportant = (emailId: number) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, important: !email.important } : email
      )
    );

    if (selectedEmail?.id === emailId) {
      setSelectedEmail((prevEmail: any) => ({
        ...(prevEmail as EmailType),
        important: !(prevEmail as EmailType).important
      }));
    }
  };

  return (
    <EmailContext.Provider value={{ emails, selectedEmail, setSelectedEmail, deleteEmail, toggleStar, toggleImportant, setFilter, filter, error, loading, searchQuery, setSearchQuery }}>
      {children}
    </EmailContext.Provider>
  );
};
