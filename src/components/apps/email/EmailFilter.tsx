import React, { useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { HR, List } from "flowbite-react";
import EmailCompose from "./EmailCompose";
import { EmailContext } from '@/app/context/EmailContext/index';
import { usePathname } from "next/navigation";
import { mutate } from "swr";

interface fitlerType {
  id?: number;
  filterbyTitle?: string;
  icon?: any;
  name?: string;
  divider?: boolean;
  color?: string;
}
const EmailFilter = () => {
  const filterData: fitlerType[] = [
    {
      id: 2,
      name: "inbox",
      icon: 'solar:inbox-line-broken',
    },
    {
      id: 3,
      name: "sent",
      icon: 'solar:plain-2-linear',
    },
    {
      id: 4,
      name: "draft",
      icon: 'solar:notes-linear',
    },
    {
      id: 5,
      name: "spam",
      icon: 'solar:flag-2-outline',
    },
    {
      id: 6,
      name: "trash",
      icon: 'solar:trash-bin-trash-outline',
    },
    {
      id: 7,
      divider: true,
    },
    {
      id: 8,
      filterbyTitle: "Sort By",
    },
    {
      id: 9,
      name: "starred",
      icon: 'solar:star-fall-minimalistic-2-line-duotone',
    },
    {
      id: 10,
      name: "important",
      icon: 'solar:bell-bing-linear',
    },
    {
      id: 11,
      divider: true,
    },
    {
      id: 12,
      filterbyTitle: "Labels",
    },
    {
      id: 13,
      name: "Promotional",
      icon: 'solar:folder-open-linear',
      color: "primary",
    },
    {
      id: 14,
      name: "Social",
      icon: 'solar:folder-open-linear',
      color: "error",
    },
    {
      id: 15,
      name: "Health",
      icon: 'solar:folder-open-linear',
      color: "success",
    },
  ];


  const { setFilter, filter } = useContext(EmailContext);

  const handleFilterClick = (filterName: string | any) => {
    setFilter(filterName);
  };


  // Reset Contacts on browser refresh
  const location = usePathname();
  const handleResetTickets = async () => {
    const response = await fetch("/api/email" , {
     method: 'GET',
     headers: {
       "broserRefreshed":"true"
   }});
   const result = await response.json();
    await mutate("/api/email");
 }

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
    <>
      <div className="left-part max-w-[235px] h-full w-full ">
        <EmailCompose />
        <List className="my-4">
          {filterData.map((item) => {
            if (item.filterbyTitle) {
              return (
                <h6 className="uppercase text-xs pb-3" key={item.id}>
                  {item.filterbyTitle}
                </h6>
              );
            } else if (item.divider) {
              return (
                <div className="my-4">
                  <HR key={item.id} className="my-6" />
                </div>
              );
            }
            return (
              <List.Item
                key={item.id}
                className={`py-[10px] gap-2 px-4 hover:bg-muted dark:hover:bg-darkmuted rounded-md text-ld cursor-pointer capitalize  ${filter === item.name ? "text-primary bg-lighthover dark:bg-darkmuted" : ""}`}

                icon={() => (
                  <Icon icon={item.icon} height={18} className={`text-${item.color}`} />
                )}
                onClick={() => handleFilterClick(item.name)}
              >
                {item.name}
              </List.Item>
            );
          })}
        </List>
      </div >
    </>
  );
};

export default EmailFilter;
