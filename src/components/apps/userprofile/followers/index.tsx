"use client"
import FollowerCard from "@/components/apps/userprofile/followers/FollowerCard";
import ProfileBanner from "@/components/apps/userprofile/profile/ProfileBanner";
import React from "react";
import { UserDataProvider } from '@/app/context/UserDataContext/index';


const FollowersApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-6">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          {/* FollowerCard */}
          <div className="col-span-12">
            <FollowerCard />
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default FollowersApp;
