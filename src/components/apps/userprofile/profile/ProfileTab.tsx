"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ProfileTab = () => {
  const location = usePathname();
  const ProfileTabs = [
    {
      label: "Profile",
      icon: "solar:user-circle-broken",
      to: "/apps/user-profile/profile",
    },
    {
      label: "Followers",
      icon: "solar:heart-linear",
      to: "/apps/user-profile/followers",
    },
    {
      label: "Friends",
      icon: "solar:users-group-two-rounded-outline",
      to: "/apps/user-profile/friends",
    },
    {
      label: "Gallery",
      icon: "solar:gallery-minimalistic-outline",
      to: "/apps/user-profile/gallery",
    },
  ];

  return (
    <>
      <div className="bg-lightprimary dark:bg-lightprimary -mt-2">
        <div className="flex justify-end ">
          {ProfileTabs.map((tab,index) => (
            <Link
            key={index}
              href={tab.to}
              className={
                location === tab.to
                  ? "flex gap-2 items-center px-4 py-3 border-b-2 border-primary text-primary"
                  : "flex gap-2 items-center px-4 py-3 border-b-2 border-transparent text-ld opacity-80"
              }
            >
              <Icon icon={tab.icon} height="20" />
              <span className="md:block hidden">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
