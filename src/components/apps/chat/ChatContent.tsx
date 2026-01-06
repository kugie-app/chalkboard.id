"use client";
import React, { useState, useContext } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Badge, Button, Drawer, HR } from "flowbite-react";
import SimpleBar from "simplebar-react";
import ChatInsideSidebar from "./ChatInsideSidebar";
import { ChatContext } from "@/app/context/ChatContext/index";
import { formatDistanceToNowStrict } from "date-fns";

type Props = {
  onClickMobile: (event: React.MouseEvent<HTMLElement>) => void;
};
const ChatContent = ({ onClickMobile }: Props) => {
  const { selectedChat }: any = useContext(ChatContext);
  console.log(selectedChat);

  const [isRightSide, setIsRightSide] = useState(true);
  const handleButtonClick = () => {
    setIsRightSide(!isRightSide);
  };

  const [isOpenMedia, setIsOpenMedia] = useState(false);
  const handleClose = () => setIsOpenMedia(false);

  return (
    <>
      <div className="p-5">
        <div>
          {selectedChat ? (
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-3 ">
                <Button
                  color={"lightprimary"}
                  className="btn-circle p-0 lg:hidden flex"
                  onClick={onClickMobile}
                >
                  <Icon icon="solar:hamburger-menu-outline" height={18} />
                </Button>
                <div className="relative sm:min-w-12 min-w-9">
                  <Image
                    src={selectedChat.thumb}
                    height={48}
                    width={48}
                    alt="user"
                    className="rounded-full sm:h-12 sm:w-12 h-9 w-9"
                  />
                  {selectedChat.status == "online" ? (
                    <Badge
                      color={"success"}
                      className="p-0 h-2 w-2 absolute bottom-1 end-0"
                    ></Badge>
                  ) : selectedChat.status == "busy" ? (
                    <Badge
                      color={"error"}
                      className="p-0 h-2 w-2 absolute bottom-1 end-0"
                    ></Badge>
                  ) : selectedChat.status == "away" ? (
                    <Badge
                      color={"warning"}
                      className="p-0 h-2 w-2 absolute bottom-1 end-0"
                    ></Badge>
                  ) : (
                    <Badge
                      color={"primary"}
                      className="p-0 h-2 w-2 absolute bottom-1 end-0"
                    ></Badge>
                  )}
                </div>
                <div>
                  <h5 className="text-base sm:mb-1">{selectedChat.name}</h5>
                  <div className="text-sm text-ld opacity-90 line-clamp-1">
                    {selectedChat.status}
                  </div>
                </div>
              </div>
              <div className="flex items-center md:gap-2 gap-1">
                <div className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10">
                  <Icon icon="solar:phone-rounded-linear" height={25} className="sm:h-10 h-5 " />
                </div>
                <div className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10">
                  <Icon icon="solar:videocamera-outline" height={25} className="sm:h-10 h-5 " />
                </div>
                <div
                  className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10 xl:flex hidden"
                  onClick={handleButtonClick}
                >
                  <HiOutlineDotsVertical size={18} className="sm:h-10 h-5 " />
                </div>
                <div className="btn-circle-hover cursor-pointer sm:h-10 sm:w-10 xl:hidden flex" onClick={() => setIsOpenMedia(true)}>
                  <HiOutlineDotsVertical size={20} className="sm:h-10 h-5 " />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <HR className="my-0" />
      <div className="flex max-h-[800px] h-[650px] ">
        <div
          className={`transition-all ${!isRightSide
              ? "lg:w-[calc(100%_-_0px)]"
              : "xl:w-[calc(100%_-_300px)] w-full"
            } `}
        >
          <div className={`${!isRightSide ? 'border-none' : 'lg:border-e'} border-ld h-full py-5 px-5`}>
            <SimpleBar className="max-h-[700px] h-[600px]">
              <div>
                <>
                  {selectedChat?.messages?.map((msg: any) => (
                    <div
                      className="flex gap-3 mb-[30px]"
                      key={msg.id + msg.createdAt}
                    >
                      {selectedChat.id === msg.senderId ? (
                        <div className="flex gap-3">
                          <div className="w-10">
                            <Image
                              src={selectedChat.thumb}
                              height={40}
                              width={40}
                              alt="user"
                              className="rounded-full"
                            />
                          </div>
                          {msg.type === "text" ? (
                            <div>
                              <div className="text-xs text-ld opacity-60 font-medium mb-1 block">
                                {selectedChat.name},{" "}
                                {formatDistanceToNowStrict(
                                  new Date(msg.createdAt),
                                  {
                                    addSuffix: false,
                                  }
                                )}{" "}
                                ago
                              </div>
                              <div className="p-2 bg-muted dark:bg-darkmuted text-ld rounded-md">
                                {msg.msg}
                              </div>
                            </div>
                          ) : null}
                          {msg.type === "image" ? (
                            <Image
                              src={msg.msg}
                              height={150}
                              width={150}
                              alt="user"
                              className="rounded-md"
                            />
                          ) : null}
                        </div>
                      ) : (
                        <div className="flex  justify-end w-full">
                          <div>
                            {msg.createdAt ? (
                              <div className="text-xs text-ld opacity-60 font-medium mb-1 block text-end">
                                {formatDistanceToNowStrict(
                                  new Date(msg.createdAt),
                                  {
                                    addSuffix: false,
                                  }
                                )}{" "}
                                ago
                              </div>
                            ) : null}
                            {msg.type === "text" ? (
                              <div className="p-2 bg-lightinfo text-ld dark:bg-lightinfo rounded-md">
                                {msg.msg}
                              </div>
                            ) : null}
                            {msg.type === "image" ? (
                              <Image
                                src={msg.msg}
                                height={150}
                                width={150}
                                alt="user"
                                className="rounded-md"
                              />
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              </div>
            </SimpleBar>
          </div>
        </div>
        {isRightSide && (
          <>
            <div
              className={`shrink-0 ${!isRightSide ? "max-w-[0]" : "xl:max-w-[300px] max-w-0"
                }`}
            >
              <ChatInsideSidebar />
            </div>
            <Drawer
              open={isOpenMedia}
              onClose={handleClose}
              className="max-w-[300px] "
              position="right"
            >
              <div>
                <ChatInsideSidebar />
              </div>
            </Drawer>
          </>
        )}
      </div>
    </>
  );
};

export default ChatContent;
