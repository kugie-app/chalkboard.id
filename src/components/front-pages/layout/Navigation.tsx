import { Badge } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const FrontNav = [
  {
    menu: "About Us",
    link: "/frontend-pages/aboutus",
    badge: false,
  },
  {
    menu: "Blog",
    link: "/frontend-pages/blog",
    badge: false,
  },
  {
    menu: "Portfolio",
    link: "/frontend-pages/portfolio",
    badge: true,
  },
  {
    menu: "Dashboard",
    link: "/",
    badge: false,
  },
  {
    menu: "Pricing",
    link: "/frontend-pages/pricing",
    badge: false,
  },
  {
    menu: "Contact",
    link: "/frontend-pages/contact",
    badge: false,
  },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <>
      <ul className="flex xl:flex-row flex-col xl:gap-9 gap-6 xl:items-center">
        {FrontNav.map((item, index) => (
          <li
            key={index}
            className={`rounded-md font-semibold text-15 py-1.5 px-2.5 ${pathname == item.link ? 'bg-lightprimary text-primary rounded-md ' : 'text-sky dark:text-white ' }`}
          >
            <Link href={item.link} className="flex gap-3 items-center text-primary-ld">
              {item.menu}
              {item.badge == true ? <Badge color={'lightprimary'}>New</Badge> : null}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navigation;
