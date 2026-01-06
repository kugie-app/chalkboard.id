import CardBox from "@/components/shared/CardBox";
import { Icon } from "@iconify/react";
import { Button, Textarea } from "flowbite-react";
import React from "react";

const PostBox = () => {
  return (
    <>
      <CardBox>
        <Textarea className="form-control-textarea" rows={5} placeholder="Share your thoughts" />
        <div className="flex gap-5 mt-3">
          <div className="flex items-center gap-3 cursor-pointer text-ld font-medium text-primary-ld">
            <Button className="btn-circle p-0" color={"primary"}>
              <Icon icon="solar:gallery-outline" height="16" />
            </Button>
            Photos / Video
          </div>
          <div className="flex items-center gap-3 cursor-pointer text-ld font-medium text-primary-ld">
            <Button className="btn-circle p-0" color={"secondary"}>
              <Icon icon="solar:book-outline" height="16" />
            </Button>
            Article
          </div>
          <Button className="ms-auto" color={'primary'}>Post</Button>
        </div>
      </CardBox>
    </>
  );
};

export default PostBox;
