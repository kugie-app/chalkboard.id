import React, { useState, useContext } from "react";
import { TbArrowBackUp, TbThumbUp } from "react-icons/tb";
import uniqueId from "lodash/uniqueId";
import {
  PostType,
  Comment as CommentType,
  CommentDataType,
  Reply,
  ProfileType,
} from "@/app/[locale]/(DashboardLayout)/types/apps/userProfile";
import { Avatar, Button, TextInput, Tooltip } from "flowbite-react";
import { UserDataContext } from '@/app/context/UserDataContext/index';

interface CommentProps {
  comment: CommentType | any;
  post: PostType;
}
interface ReplyProps {
  data: CommentDataType;
  reply: Reply[];
  profile: ProfileType;
}

const PostComments = ({ comment, post }: CommentProps) => {

  const { likeReply, addReply }: any = useContext(UserDataContext);
  const [replyTxt, setReplyTxt] = useState<any>("");
  const [showReply, setShowReply] = useState(false);

  const handleLikeReply = (postId: any, commentId: any) => {
    likeReply(postId, commentId);
  };

  const onSubmit = async (
    postId: number,
    commentId: string | any,
    reply: CommentDataType
  ) => {
    const replyId = uniqueId("#REPLY_");
    const newReply: PostType[] | any = {
      id: replyId,
      profile: {
        id: uniqueId("#REPLY_"),
        avatar: post?.profile.avatar,
        name: post?.profile.name,
        time: "now",
      },
      data: {
        comment: reply,
        likes: {
          like: false,
          value: 0,
        },
        replies: [],
      },
    };
    addReply(postId, commentId, newReply);
    setReplyTxt('');
    setShowReply(false);
  };

  return (
    <>
      <div className="p-4 bg-muted dark:bg-darkmuted rounded-lg my-6">
        <div className="flex items-center gap-3">
          <Avatar
            img={comment?.profile.avatar}
            alt="profile"
            rounded
            size={"sm"}
          />
          <h6>{comment?.profile.name}</h6>
          <p className="flex items-center gap-2">
            <span className="h-[6px] w-[6px] rounded-full bg-dark opacity-40 dark:bg-white block"></span>
            {comment?.profile.time}
          </p>
        </div>
        {/**Post Content**/}
        <p className="text-ld opacity-80 text-sm py-4">
          {comment?.data.comment}
        </p>

        <div className="flex gap-5 mt-3">
          <div className="flex items-center gap-3 cursor-pointer text-dark font-medium text-primary-ld">
            <Tooltip content="Like">
              <Button
                className="btn-circle p-0"
                color={
                  comment?.data &&
                    comment?.data.likes &&
                    comment?.data.likes.like
                    ? "primary"
                    : "primary"
                }
                onClick={() => handleLikeReply(post?.id, comment?.id)}
              >
                <TbThumbUp size="16" />
              </Button>
            </Tooltip>
            <span className="font-semibold text-ld text-sm">
              {comment?.data &&
                comment?.data.likes &&
                comment?.data.likes.value}
            </span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer text-dark font-medium text-primary-ld">
            <Tooltip content="Reply">
              <Button
                className="btn-circle p-0"
                color={"secondary"}
                onClick={() => setShowReply(!showReply)}
              >
                <TbArrowBackUp size="16" />
              </Button>
            </Tooltip>
            <span className="font-semibold text-ld text-sm">
              {comment?.data.replies.length > 0
                ? comment?.data.replies.length
                : 0}
            </span>
          </div>
        </div>
      </div>

      {comment?.data.replies ? (
        <>
          {comment?.data.replies.map((reply: ReplyProps) => {
            return (
              <div className="ps-4" key={reply.data.comment}>
                <div className="p-4 bg-muted dark:bg-darkmuted rounded-lg mt-6">
                  <div className="flex items-center gap-3">
                    <Avatar img={reply.profile.avatar} alt="profile" rounded />
                    <h6>{reply?.profile.name}</h6>
                    <p className="flex items-center gap-2">
                      <span className="h-[6px] w-[6px] rounded-full bg-dark opacity-40 dark:bg-white block"></span>
                      {reply?.profile.time}
                    </p>
                  </div>

                  <p className="text-ld opacity-80 text-sm py-4">
                    {reply?.data.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
      {showReply ? (
        <div className="ps-8 mt-6">
          <div className="flex gap-3 items-center justify-between">
            <div className="w-12">
              <Avatar img={post?.profile.avatar} alt="profile" className="" rounded />
            </div>
            <TextInput
              type="text"
              sizing="md"
              className="form-control w-full"
              placeholder="Reply"
              value={replyTxt}
              onChange={(e) => setReplyTxt(e.target.value)}
            />
            <Button
              onClick={() => onSubmit(post.id, comment.id, replyTxt)}
              color={"secondary"}
            >
              Reply
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PostComments;
