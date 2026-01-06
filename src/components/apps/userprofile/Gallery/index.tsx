"use client";
import GalleryCards from "@/components/apps/userprofile/Gallery/GalleryCards";
import ProfileBanner from "@/components/apps/userprofile/profile/ProfileBanner";
import React from "react";
import { UserDataProvider } from '@/app/context/UserDataContext/index';


const GalleryApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-6">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          {/* GalleryCards */}
          <div className="col-span-12">
            <GalleryCards />
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default GalleryApp;
