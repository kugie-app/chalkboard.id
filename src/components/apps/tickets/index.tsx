"use client";
import React, { useContext, useEffect } from "react";

import CardBox from "@/components/shared/CardBox";
import TicketFilter from "@/components/apps/tickets/TicketFilter";
import TicketListing from "@/components/apps/tickets/TicketListing";
import { TicketProvider } from '@/app/context/TicketContext/index';


const TicketsApp = () => {

  return (
    <>
      <TicketProvider>
        <CardBox>
          <TicketFilter />
          <TicketListing />
        </CardBox>
      </TicketProvider>
    </>
  );
};

export default TicketsApp;
