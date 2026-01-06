"use client";
import React, { useContext, useEffect, useState } from "react";
import { ChildItem } from "../Sidebaritems";
import { Sidebar } from "flowbite-react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { CustomizerContext } from "@/app/context/CustomizerContext";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';

interface NavItemsProps {
  item: ChildItem;
}
const NavItems: React.FC<NavItemsProps> = ({ item }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const {setIsMobileSidebar} = useContext(CustomizerContext);
  const t = useTranslations();
  const [translatedLabel, setTranslatedLabel] = useState<string | null>(null);

  const handleMobileSidebar = () => {
       setIsMobileSidebar(false)
  }

  useEffect(() => {
    const loadTranslation = async () => {
      const label = t(`Navigation.${item.name?.toLowerCase().replace(/\s+/g, '') || ''}`);
      setTranslatedLabel(label);
    };
    loadTranslation();
  }, [item.name, t]);
  return (
    <>
      <Sidebar.Item
        href={item.url}
        as={Link}
        className={`${
          pathname.includes(item.url)
            ? "text-white bg-primary rounded-xl  hover:text-white hover:bg-primary dark:hover:text-white shadow-btnshdw active"
            : "text-link bg-transparent group/link "
        } `}
      >
        <span onClick={handleMobileSidebar} className="flex gap-3 align-center items-center truncate">
          {item.icon ? (
            <Icon icon={item.icon} className={`${item.color}`} height={18} />
          ) : (
            <span
              className={`${
                item.url == pathname
                  ? "dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary !bg-primary h-[6px] w-[6px]"
                  : "h-[6px] w-[6px] bg-black/40 dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary"
              } `}
            ></span>
          )}
          <span className="max-w-36 overflow-hidden hide-menu">
            {translatedLabel || item.name}
          </span>
        </span>
      </Sidebar.Item>
    </>
  );
};

export default NavItems;
