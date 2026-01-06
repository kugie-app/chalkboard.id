"use client";
import React, { useEffect } from "react";
import { Flowbite } from "flowbite-react";
import LpHeader from "@/components/landingpage/header/Header";
import customTheme from "@/utils/theme/custom-theme";
import LpBanners from "@/components/landingpage/banner/banner";
import ProductDemos from "@/components/landingpage/productdemos/demos";
import AllFeatures from "@/components/landingpage/features/AllFeatures";
import ClientReviews from "@/components/landingpage/reviews/ClientReviews";
import Ticket from "@/components/landingpage/ticket/Ticket";
import Footer from "@/components/landingpage/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import Development from "./animation/Development";
import LoginReg from "./login/LoginReg";
const Landingpage = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <div className="landingpage">
          <LpHeader />
          <LpBanners />
          <ProductDemos />
          <Development />
          <ClientReviews />
          <AllFeatures />
          <Ticket />
          <LoginReg />
          <Footer />
        </div>
      </Flowbite>
    </>
  );
};

export default Landingpage;
