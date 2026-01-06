import React, { useContext, useEffect } from "react";
import { TicketContext } from '@/app/context/TicketContext/index';
import { mutate } from "swr";
import { usePathname } from "next/navigation";

const TicketFilter = () => {

  const { tickets, setFilter }: any = useContext(TicketContext);
  const pendingC = tickets.filter((t: { Status: string; }) => t.Status === 'Pending').length;
  const openC = tickets.filter((t: { Status: string; }) => t.Status === 'Open').length;
  const closeC = tickets.filter((t: { Status: string; }) => t.Status === 'Closed').length;
  const location = usePathname();

// Reset Tickets on browser refresh

const handleResetTickets = async () => {
  const response = await fetch("/api/ticket" , {
   method: 'GET',
   headers: {
     "broserRefreshed":"true"
 }});
 const result = await response.json();
  await mutate("/api/ticket");
}

useEffect(() => {
 const isPageRefreshed = sessionStorage.getItem("isPageRefreshed");
 if (isPageRefreshed === "true") {
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
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-3 md:col-span-6  col-span-12">
          <div
            className="p-[30px] bg-lightprimary dark:bg-lightprimary text-center rounded-md cursor-pointer"
            onClick={() => setFilter('total_tickets')}
          >
            <h3 className="text-primary text-2xl">{tickets.length}</h3>
            <h6 className="text-base text-primary">Total Tickets</h6>
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-6  col-span-12">
          <div
            className="p-[30px] bg-lightwarning dark:bg-lightwarning text-center rounded-md cursor-pointer"
            onClick={() => setFilter('Pending')}
          >
            <h3 className="text-warning text-2xl">{pendingC}</h3>
            <h6 className="text-base text-warning">Pending Tickets</h6>
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-6  col-span-12">
          <div
            className="p-[30px] bg-lightsuccess dark:bg-lightsuccess text-center rounded-md cursor-pointer"
            onClick={() => setFilter('Open')}
          >
            <h3 className="text-success text-2xl">{openC}</h3>
            <h6 className="text-base text-success">Open Tickets</h6>
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-6  col-span-12">
          <div
            className="p-[30px] bg-lighterror dark:bg-lighterror text-center rounded-md cursor-pointer"
            onClick={() => setFilter('Closed')}
          >
            <h3 className="text-error text-2xl">{closeC}</h3>
            <h6 className="text-base text-error">Closed Tickets</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketFilter;
