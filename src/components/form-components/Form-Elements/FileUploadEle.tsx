import { Label, FileInput } from "flowbite-react";
import React from "react";
import CardBox from "../../shared/CardBox";

const FileUploadEle = () => {
  return (
    <div>
      <CardBox>
        <h4 className="text-lg font-semibold mb-2">File Upload</h4>
        <div id="fileUpload" className="max-w-md pb-[6.625rem]">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file" />
          </div>
          <FileInput
            id="file"
            helperText="A profile picture is useful to confirm your are logged into your account"
          />
        </div>
      </CardBox>
    </div>
  );
};

export default FileUploadEle;
