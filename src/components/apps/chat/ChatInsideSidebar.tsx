import React, { useContext } from "react";
import Image from "next/image";
import { ChatContext } from '@/app/context/ChatContext/index';
import { uniq, flatten } from 'lodash';
import { Icon } from "@iconify/react";
const ChatInsideSidebar = () => {

  const { selectedChat } = useContext(ChatContext);
  const totalAttachment = uniq(flatten(selectedChat?.messages.map((item) => item.attachment))).length;
  const totalMedia = uniq(flatten(selectedChat?.messages.map((item) => (item?.type === 'image' ? item.msg : null)))).length - 1;

  return (
    <>
      <div className="p-5">
        {/* Media */}
        <h6 className="text-sm"> Media ({totalMedia})</h6>
        <div className="mt-3">
          <>
            <React.Fragment>
              {selectedChat?.messages.map((c, index) => {
                return (
                  <div
                    className="md:col-span-4 sm:col-span-6 col-span-12"
                    key={index}
                  >
                    {c?.type === "image" ? (
                      <Image
                        src={c.msg}
                        alt="media"
                        className="rounded-md"
                        height={100}
                        width={100}
                      />
                    ) : null}
                  </div>
                );
              })}
            </React.Fragment>
          </>
        </div>
        {/* Files */}
        <div className="mt-8">
          <h6 className="text-sm">  Attachments ({totalAttachment})</h6>
          <div>
            {selectedChat?.messages.map((c, index) => {
              return (
                <div key={index}>
                  <div className="flex flex-col gap-4 mt-4">
                    {c?.attachment?.map((a, index) => {
                      return (
                        <div key={index}>
                          <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="bg-muted dark:bg-darkmuted p-3 rounded-md">
                              <Image
                                src={a.icon || ''}
                                height={24}
                                width={24}
                                alt="download"
                              />
                            </div>
                            <div>
                              <h5 className="text-sm group-hover:text-primary">
                                {a.file}
                              </h5>
                              <p className="text-xs text-darklink dark:text-bodytext">
                                {a.fileSize}
                              </p>
                            </div>
                            <div className="btn-circle-hover cursor-pointer invisible  group-hover:visible ms-auto  opacity:50">
                              <Icon icon="solar:download-outline" height="20" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInsideSidebar;