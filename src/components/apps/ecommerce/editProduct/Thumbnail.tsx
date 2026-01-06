"use client";
import CardBox from "@/components/shared/CardBox";
import { FileInput, Label } from "flowbite-react";
import React from "react";
import { Icon } from "@iconify/react";
const Thumbnail = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">Thumbnail</h5>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex  w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-primary bg-lightprimary"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <Icon icon="solar:cloud-upload-outline" height={32} className="mb-3 text-darklink dark:text-bodytext" />
              <p className="mb-2 text-sm text-darklink dark:text-bodytext">
                Drop Thumbnail here to upload
              </p>

            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>

        </div>
        <small className="text-xs text-darklink dark:text-bodytext text-center">
          Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
          files are accepted.
        </small>
      </CardBox>
    </>
  );
};

export default Thumbnail;
