"use client";
import React, { useContext } from "react";
import { Button, TextInput } from "flowbite-react";
import { Icon } from "@iconify/react";
import { ContactContext } from "@/app/context/Conatactcontext/index";

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const ContactSearch = ({ onClick }: Props) => {
  const { searchTerm, updateSearchTerm } = useContext(ContactContext);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTerm(e.target.value);
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
          value={searchTerm}
          placeholder="Search Notes"
          className="form-control w-full"
          sizing="md"
          required
          onChange={handleSearchChange}
          icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
        />
      </div>
    </>
  );
};
export default ContactSearch;
