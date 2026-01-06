
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn-ui/Default-Ui/avatar";
import BasicAvatarCode from './code/BasicAvatarCode'

const BasicAvatar = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Avatar</h4>
              <BasicAvatarCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <Avatar>
                    <AvatarImage src="/images/profile/user-3.jpg" alt="user" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> 
                <Avatar>
                    <AvatarImage src="/images/profile/user-2.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar> 
                <Avatar>
                    <AvatarImage src="/images/profile/user-4.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="/images/profile/user-5.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage src="/images/profile/user-6.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </CardBox>
    )
}

export default BasicAvatar