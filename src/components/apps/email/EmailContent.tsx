"use client";
import {
  Alert,
  Badge,
  Button,
  Drawer,
  HR,
  Textarea,
  Tooltip,
} from "flowbite-react";
import React, { useState, useContext } from "react";
import SimpleBar from "simplebar-react";
import Image from "next/image";
import { EmailContext } from "@/app/context/EmailContext/index";
import { Icon } from "@iconify/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Define the props interface
interface MailListItemProps {
  openMailValue: boolean;
  onCloseMail: () => void;
}

const EmailContent: React.FC<MailListItemProps> = ({
  openMailValue,
  onCloseMail,
}) => {
  const [isTextboxVisible, setIsTextboxVisible] = useState(false);
  const { selectedEmail, deleteEmail, toggleStar, toggleImportant }: any =
    useContext(EmailContext);

  const handleButtonClick = () => {
    setIsTextboxVisible(!isTextboxVisible);
  };

  const handleDelete = () => {
    if (selectedEmail) {
      deleteEmail(selectedEmail.id);
    }
  };

  if (!selectedEmail) {
    return (
      <div className="w-full text-center p-5">
        <div className="px-6 pt-3">
          <Alert
            color="lighterror"
            icon={() => <Icon icon="solar:info-circle-broken" height={18} />}
          >
            <span className="ps-2 text-base"> Please Select an Email</span>
          </Alert>
        </div>
        <h4></h4>
        <Image
          src="/images/backgrounds/emailSv.png"
          alt="Email Icon"
          width="250"
          height="250"
          className="mx-auto"
        />
      </div>
    );
  }

  const hasAttachments = selectedEmail.attchments && selectedEmail.attchments.length > 0;

  return (
    <>
      <Drawer
        open={openMailValue}
        backdrop={false}
        onClose={onCloseMail}
        position="right"
        className="lg:relative lg:transform-none lg:h-auto lg:bg-transparent w-full lg:z-[0]"
      >
        <div className="lg:hidden block p-6 pb-2">
          <Button
            color={"outlineprimary"}
            onClick={onCloseMail}
            className="py-0"
          >
            <Icon icon="solar:round-arrow-left-linear" height={18}></Icon>Back
          </Button>
        </div>
        <div className="w-full">
          <div className="w-fit">
            <div className="flex items-center gap-2 py-4 px-5">
              <Tooltip content={"Star"}>
                <div
                  className="btn-circle-hover cursor-pointer group"
                  onClick={() => toggleStar(selectedEmail.id)}
                >
                  {selectedEmail.starred === true ? (
                    <Icon icon='solar:star-bold' className="text-warning" height="18" />
                  ) : (
                    <Icon icon='solar:star-line-duotone'
                      height="17"
                      className="text-dark dark:text-darklink dark:text-bodytext group-hover:text-primary"
                    />
                  )}
                </div>
              </Tooltip>
              <Tooltip content={"Important"}>
                <div className="btn-circle-hover cursor-pointer group">
                  <Icon icon="solar:info-circle-outline" className="text-dark dark:text-darklink dark:text-bodytext group-hover:text-primary"
                    height="18"
                    onClick={() => toggleImportant(selectedEmail.id)}
                    style={{
                      fill: selectedEmail.important ? "#FFD9E4" : "",
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip content={"Delete"}>
                <div className="btn-circle-hover cursor-pointer group">
                  <Icon icon="solar:trash-bin-minimalistic-outline" className="text-dark dark:text-darklink dark:text-bodytext group-hover:text-primary" height="18" onClick={handleDelete} />
                </div>
              </Tooltip>
            </div>
          </div>
          <SimpleBar className="max-h-[600px] h-[calc(100vh_-_100px)]">
            <div className="py-5 px-5">
              <div className="flex items-center w-full">
                <div className="flex items-center gap-2 w-full">
                  <Image
                    alt="user"
                    src={selectedEmail.thumbnail}
                    height={48}
                    width={48}
                    className="rounded-full"
                  />
                  <div>
                    <h6 className="text-sm">{selectedEmail.from}</h6>
                    <p className="text-darklink dark:text-bodytext text-sm">{selectedEmail.To}</p>
                  </div>
                </div>
                <div>
                  {selectedEmail.label === "Promotional" ? (
                    <Badge color={"primary"}>{selectedEmail.label}</Badge>
                  ) : selectedEmail.label === "Social" ? (
                    <Badge color={"error"}>{selectedEmail.label}</Badge>
                  ) : selectedEmail.label === "Health" ? (
                    <Badge color={"success"}>{selectedEmail.label}</Badge>
                  ) : (
                    <Badge color={"primary"}>{selectedEmail.label}</Badge>
                  )}
                </div>
              </div>
              <div className="mt-8">
                <h5 className="text-xl">{selectedEmail.subject}</h5>
                <div
                  className="email-content"
                  dangerouslySetInnerHTML={{
                    __html: selectedEmail.emailContent,
                  }}
                ></div>
                {hasAttachments && (
                  <>
                    <HR className="my-6" />
                    <h6 className="text-sm">Attachments</h6>
                    <div className="grid grid-cols-12 gap-6 mt-4">
                      {selectedEmail.attchments.map((attach: { id: React.Key | null | undefined; image: string | StaticImport; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; fileSize: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | Iterable<React.ReactNode> | null | undefined; }) => (
                        <div
                          className="lg:col-span-4 md:col-span-6 col-span-12"
                          key={attach.id}
                        >
                          <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="bg-muted dark:bg-darkmuted p-3 rounded-md">
                              <Image
                                src={attach.image}
                                height={24}
                                width={24}
                                alt="download"
                              />
                            </div>
                            <div>
                              <h5 className="text-sm group-hover:text-primary">
                                {attach.title}
                              </h5>
                              <p className="text-sm text-darklink dark:text-bodytext">
                                {attach.fileSize}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <HR className="my-4" />
                  </>
                )}
              </div>
            </div>
            <div className="px-5">
              <div className="flex gap-6 ">
                <span
                  className="cursor-pointer text-sm text-ld text-primary-ld flex items-center"
                  onClick={handleButtonClick}
                >
                  <Icon icon="solar:undo-left-outline" height={18} className="me-1" />
                  Reply
                </span>
                <span className="cursor-pointer text-sm text-ld text-primary-ld flex items-center">
                  <Icon icon="solar:undo-right-outline" height={18} className="me-1" />
                  Forward
                </span>
              </div>
              {isTextboxVisible && (
                <Textarea
                  className="form-control-textarea mt-4"
                  required
                  rows={4}
                ></Textarea>
              )}
            </div>
          </SimpleBar>
        </div>
      </Drawer>
    </>
  );
};

export default EmailContent;



