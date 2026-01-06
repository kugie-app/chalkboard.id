"use client";
import React, { useContext } from "react";
import Sidebar from "@/components/layout/vertical/sidebar/Sidebar";
import Header from "@/components/layout/vertical/header/Header";
import { Customizer } from "@/components/layout/shared/customizer/Customizer";
import { CustomizerContext } from "@/app/context/CustomizerContext";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeLayout, isLayout } = useContext(CustomizerContext);
  return (
    <div className="flex w-full min-h-screen dark:bg-darkgray">
      <div className="page-wrapper flex w-full  ">
        {/* Header/sidebar */}

        {activeLayout == "vertical" ? <Sidebar /> : null}
        <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
          {/* Top Header  */}
          {activeLayout == "horizontal" ? (
            <Header layoutType="horizontal" />
          ) : (
            <Header layoutType="vertical" />
          )}

          <div
            className={`bg-lightgray dark:bg-dark  h-full ${
              activeLayout != "horizontal" ? "rounded-bb" : "rounded-none"
            } `}
          >
            {/* Body Content  */}
            <div
              className={` ${
                isLayout == "full"
                  ? "w-full py-30 md:px-30 px-5"
                  : "container mx-auto  py-30"
              } ${activeLayout == "horizontal" ? "xl:mt-3" : ""}
              `}
            >
              {children}
            </div>
            <Customizer />
          </div>
        </div>
      </div>
    </div>
  );
}
