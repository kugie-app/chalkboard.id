"use client";
import React, { useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import ContactAdd from "./ContactAdd";
import { HR, List } from "flowbite-react";
import { ContactContext } from "@/app/context/Conatactcontext/index";
import { usePathname } from "next/navigation";
import { mutate } from "swr";

interface DataType {
  id: number;
  name?: string;
  sort?: string;
  icon?: any;
  filterbyTitle?: string;
  devider?: boolean;
  color?: string;
}

const ContactFilter = () => {
  const { setSelectedDepartment, updateSearchTerm, selectedDepartment } =
    useContext(ContactContext);

  const filterData: DataType[] = [
    {
      id: 2,
      name: "All",
      sort: "show_all",
      icon: "solar:inbox-unread-outline",
    },
    {
      id: 3,
      name: "Frequent",
      sort: "frequent_contact",
      icon: "solar:map-arrow-square-line-duotone",
    },
    {
      id: 4,
      name: "Starred",
      sort: "starred_contact",
      icon: "solar:cart-broken",
    },
    {
      id: 6,
      devider: true,
    },
    {
      id: 5,
      filterbyTitle: "Categories",
    },
    {
      id: 7,
      name: "Engineering",
      sort: "engineering_department",
      icon: "solar:folder-broken",
      color: "primary",
    },
    {
      id: 8,
      name: "Support",
      sort: "support_department",
      icon: "solar:question-circle-outline",
      color: "error",
    },
    {
      id: 9,
      name: "Sales",
      sort: "sales_department",
      icon: "solar:sale-square-outline",
      color: "success",
    },
  ];

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
    updateSearchTerm("");
  };

  const location = usePathname();

  // Reset Contacts on browser refresh
  const handleResetTickets = async () => {
    const response = await fetch("/api/contacts", {
      method: "GET",
      headers: {
        broserRefreshed: "true",
      },
    });
    const result = await response.json();
    await mutate("/api/contacts");
  };

  useEffect(() => {
    const isPageRefreshed = sessionStorage.getItem("isPageRefreshed");
    if (isPageRefreshed === "true") {
      console.log("page refreshed");
      sessionStorage.removeItem("isPageRefreshed");
      handleResetTickets();
    }
  }, [location]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("isPageRefreshed", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="left-part max-w-[235px] h-full w-full">
      <ContactAdd />
      <List className="my-4">
        {filterData.map((filter) => {
          if (filter.filterbyTitle) {
            return (
              <h6
                className="uppercase text-xs pb-3"
                key={`filter-title-${filter.id}`}
              >
                {filter.filterbyTitle}
              </h6>
            );
          } else if (filter.devider) {
            return (
              <div className="my-4" key={`divider-${filter.id}`}>
                <HR className="my-6" />
              </div>
            );
          }
          return (
            <List.Item
              key={`list-item-${filter.id}`}
              className={`py-[10px] gap-2 px-4 hover:bg-muted dark:hover:bg-darkmuted rounded-md text-ld cursor-pointer ${
                selectedDepartment === filter.name
                  ? "text-primary bg-lighthover dark:bg-darkmuted"
                  : ""
              }`}
              icon={() => (
                <Icon
                  icon={filter.icon}
                  height={18}
                  className={`text-${filter.color}`}
                />
              )}
              onClick={() => handleDepartmentClick(filter.name || "")}
            >
              {filter.name}
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default ContactFilter;
