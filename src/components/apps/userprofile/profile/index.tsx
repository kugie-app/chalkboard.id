"use client";
import Introduction from "@/components/apps/userprofile/profile/Introduction";
import Photos from "@/components/apps/userprofile/profile/Photos";
import Post from "@/components/apps/userprofile/profile/Post";
import ProfileBanner from "@/components/apps/userprofile/profile/ProfileBanner";
import React from "react";
import { UserDataProvider } from '@/app/context/UserDataContext/index';

const UserProfileApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-[30px]">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="grid grid-cols-12 gap-[30px]">
              {/* Introduction */}
              <div className="col-span-12">
                <Introduction />
              </div>
              {/* Photos */}
              <div className="col-span-12">
                <Photos />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <Post />
          </div>
        </div>
      </UserDataProvider>
    </>
  );
};

export default UserProfileApp;
