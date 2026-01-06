"use client";
import React, { useEffect, useState } from "react";
import CardBox from "@/components/shared/CardBox";
import NotesSidebar from "@/components/apps/notes/NotesSidebar";
import NoteContent from "@/components/apps/notes/NoteContent";
import AddNotes from "@/components/apps/notes/AddNotes";
import { Icon } from "@iconify/react";
import { Button, Drawer } from "flowbite-react";
import { NotesProvider } from '@/app/context/NotesContext/index'
import { usePathname } from "next/navigation";
import { mutate } from "swr";

interface colorsType {
  lineColor: string;
  disp: string | any;
  id: number;
}

const NotesApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const location = usePathname();

  // Reset Notes on browser refresh
  const handleResetTickets = async () => {
    const response = await fetch("/api/notes" , {
     method: 'GET',
     headers: {
       "broserRefreshed":"true"
   }});
   const result = await response.json();
    await mutate("/api/notes");
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

 
  const colorvariation: colorsType[] = [
    {
      id: 1,
      lineColor: "warning",
      disp: "warning",
    },
    {
      id: 2,
      lineColor: "primary",
      disp: "primary",
    },
    {
      id: 3,
      lineColor: "error",
      disp: "error",
    },
    {
      id: 4,
      lineColor: "success",
      disp: "success",
    },
    {
      id: 5,
      lineColor: "secondary",
      disp: "secondary",
    },
  ];
  return (
    <>
      <NotesProvider>
        <CardBox className="p-0 overflow-hidden">
          <div className="flex">
            {/* NOTES SIDEBAR */}
            <div>
              <Drawer
                open={isOpen}
                onClose={handleClose}
                className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent lg:z-[0]"
              >
                <NotesSidebar />
              </Drawer>
            </div>

            {/* NOTES CONTENT */}
            <div className="w-full">
              <div className="flex justify-between items-center border-b border-ld py-4 px-6">
                <div className="flex gap-3 items-center">
                  <Button
                    color={"lightprimary"}
                    onClick={() => setIsOpen(true)}
                    className="btn-circle p-0 lg:hidden flex"
                  >
                    <Icon icon="solar:hamburger-menu-outline" height={18} />
                  </Button>
                  <h6 className="text-base"> Edit Note</h6>
                </div>
                <AddNotes colors={colorvariation} />
              </div>
              <NoteContent />
            </div>
          </div>
        </CardBox>
      </NotesProvider>
    </>
  );
};

export default NotesApp;
