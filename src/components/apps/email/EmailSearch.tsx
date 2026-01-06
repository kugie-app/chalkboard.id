"use client";
import { Button, TextInput } from "flowbite-react";
import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { EmailContext } from '@/app/context/EmailContext/index';

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};
const EmailSearch = ({ onClick }: Props) => {

  const { setSearchQuery, searchQuery } = useContext(EmailContext);

  const handleSearchChange = (event: { target: { value: string; }; }) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <>
      <div className="flex gap-3 bg-white dark:bg-transparent px-6 py-5 items-center">
        <Button
          color={"lightprimary"}
          className="btn-circle p-0 lg:hidden flex"
          onClick={onClick}
        >
          <Icon icon="solar:hamburger-menu-outline" height={18} />
        </Button>
        <TextInput
          id="search"
          placeholder="Search Emails"
          className="form-control w-full"
          sizing="md"
          required
          value={searchQuery}
          onChange={handleSearchChange}
          icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
        />
      </div>
    </>
  );
};

export default EmailSearch;
