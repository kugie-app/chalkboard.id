import { Icon } from "@iconify/react";
import { Badge, Dropdown } from "flowbite-react";
import React from "react";
import * as profileData from "./Data";
import Link from "next/link";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import DefaultSpinner from "@/components/ui-components/Spinner/DefaultSpinner";
const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: '/auth/signin',
      redirect: true 
    });
  };

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <div className="flex items-center gap-1">
        <span className="h-10 w-10 rounded-full flex justify-center items-center">
          <DefaultSpinner />
        </span>
      </div>
    );
  }

  // Don't render if not authenticated
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="relative ">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] pb-4 rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex items-center gap-1">
            <span className="h-10 w-10 hover:text-primary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              <Image
                src="/images/profile/user-1.jpg"
                alt={session?.user?.name || "User profile"}
                height="35"
                width="35"
                className="rounded-full"
              />
            </span>
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="hover:text-primary dark:text-primary group-hover/menu:text-primary"
              height={12}
            />
          </div>
        )}
      >
        <div className="px-6">
          <div className="flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3">
            <Image
              src="/images/profile/user-1.jpg"
              alt={session?.user?.name || "User profile"}
              height="56"
              width="56"
              className="rounded-full"
            />
            <div>
              <h5 className="text-15 font-semibold">
                {session?.user?.name || "ChalkBoard User"}
                {session?.user?.role === 'admin' && (
                  <span className="text-success ml-2">Admin</span>
                )}
                {session?.user?.role === 'manager' && (
                  <span className="text-primary ml-2">Manager</span>
                )}
              </h5>
              <p className="text-sm text-ld opacity-80">
                {session?.user?.email || "user@chalkboard.com"}
              </p>
            </div>
          </div>
        </div>
        <SimpleBar>
          {profileData.profileDD.map((items, index) => (
            <div key={index} className="px-6 mb-2">
              {items.title === "Sign Out" ? (
                <Dropdown.Item
                  onClick={handleSignOut}
                  className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md cursor-pointer"
                >
                  <div className="flex items-center w-full">
                    <div className="flex gap-3 w-full">
                      <h5 className="text-15 font-normal group-hover/link:text-primary">
                        {items.title}
                      </h5>
                    </div>
                  </div>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  as={Link}
                  href={items.url}
                  className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md"
                >
                  <div className="flex items-center w-full">
                    <div className="flex gap-3 w-full">
                      <h5 className="text-15 font-normal group-hover/link:text-primary">
                        {items.title}
                      </h5>
                      {items.url === "/apps/invoice" ? (
                        <Badge color={"lightprimary"}>4</Badge>
                      ) : null}
                    </div>
                  </div>
                </Dropdown.Item>
              )}
            </div>
          ))}
        </SimpleBar>
      </Dropdown>
    </div>
  );
};

export default Profile;
