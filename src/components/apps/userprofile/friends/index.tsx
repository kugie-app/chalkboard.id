"use client"
import FriendsCard from '@/components/apps/userprofile/friends/FriendsCard';
import ProfileBanner from '@/components/apps/userprofile/profile/ProfileBanner'
import React from 'react'
import { UserDataProvider } from '@/app/context/UserDataContext/index';

const FriendsApp = () => {
  return (
    <>
      <UserDataProvider>
        <div className="grid grid-cols-12 gap-6">
          {/* Banner */}
          <div className="col-span-12">
            <ProfileBanner />
          </div>
          {/* FriendsCard */}
          <div className="col-span-12">
            <FriendsCard />
          </div>
        </div>
      </UserDataProvider>
    </>
  )
}

export default FriendsApp
