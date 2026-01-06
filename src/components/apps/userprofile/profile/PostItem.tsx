import React, { useState, useContext } from "react";
import {
  TbThumbUp,
} from "react-icons/tb";
import { Icon } from "@iconify/react";
import uniqueId from "lodash/uniqueId";
import PostComments from "./PostComments";
import {
  Comment as CommentType,
  PostType,
} from "@/app/[locale]/(DashboardLayout)/types/apps/userProfile";
import CardBox from "@/components/shared/CardBox";
import { Avatar, Button, HR, TextInput, Tooltip } from "flowbite-react";
import Image from "next/image";
import { UserDataContext } from '@/app/context/UserDataContext/index';

interface Props {
  post: PostType;
}

const PostItem = ({ post }: Props) => {
  const { likePost, addComment }: any = useContext(UserDataContext);
  const [comText, setComText] = useState<any>("");

  const handleLike = (postId: any) => {
    likePost(postId);
  };

  const onSubmit = async (postId: number, comment: CommentType) => {
    const commentId = uniqueId('#COMMENT_');
    const newComment = {
      id: commentId,
      profile: {
        id: uniqueId('#COMMENT_'),
        avatar: post?.profile.avatar,
        name: post?.profile.name,
        time: 'now',
      },
      data: {
        comment: comment,
        likes: {
          like: false,
          value: 0,
        },
        replies: [],
      },
    };
    addComment(postId, newComment);
    setComText('');
  };

  return (
    <>
      <CardBox className="p-0">
        <div className="p-6 pb-0">
          <div className="flex items-center gap-3">
            <Avatar img={post?.profile.avatar} alt="profile" rounded />
            <h6>{post?.profile.name}</h6>
            <p className="flex items-center gap-2">
              <span className="h-[6px] w-[6px] rounded-full bg-dark opacity-40 dark:bg-white block"></span>
              {post?.profile.time}
            </p>
          </div>
          {/**Post Content**/}
          <p className="text-darklink dark:text-bodytext text-sm py-4">{post?.data.content}</p>
          {/**If Post has Image**/}
          {post.data.images.length > 0 ? (
            <div className="grid grid-cols-12 gap-[30px]">
              {post?.data.images.map((photo) => {
                return (
                  <div
                    key={photo.img}
                    className={`lg:col-span-${photo.featured ? 12 : 6
                      } md:col-span-12 col-span-12`}
                  >
                    <div className="h-[360px] overflow-hidden rounded-lg">
                      <Image
                        src={photo.img}
                        alt="coverbanner"
                        className="rounded-lg h-full object-cover object-top"
                        width={1200}
                        height={360}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
          {/**If Post has Video**/}
          {post?.data.video ? (
            <iframe
              className="w-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${post?.data.video}`}
            ></iframe>
          ) : (
            ""
          )}
          {/**Post Like Comment Share buttons**/}
          <div className="flex gap-5 mt-6">
            <div className="flex items-center gap-3 cursor-pointer text-dark font-medium text-primary-ld">
              <Tooltip content="Like">
                <Button
                  className="btn-circle p-0"
                  color={
                    post?.data && post?.data.likes && post?.data.likes.like
                      ? "primary"
                      : "muted"
                  }
                  onClick={() => handleLike(post?.id)}
                >
                  <TbThumbUp size="16" />
                </Button>
              </Tooltip>
              <span className="font-semibold text-ld text-sm">
                {post?.data && post?.data.likes && post?.data.likes.value}
              </span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer text-dark font-medium text-primary-ld">
              <Tooltip content="Comment">
                <Button className="btn-circle p-0" color={"secondary"}>
                  <Icon icon="solar:chat-line-outline" height="16" />
                </Button>
              </Tooltip>
              <span className="font-semibold text-ld text-sm">
                {post?.data.comments ? post?.data.comments.length : 0}
              </span>
            </div>
            <div className="ms-auto">
              <Tooltip content="Share">
                <Button className="btn-circle p-0" color={"transparent"}>
                  <Icon icon="solar:share-outline" height="16" />
                </Button>
              </Tooltip>
            </div>
          </div>

          {/**Comments if any**/}
          <div>
            {post?.data.comments ? (
              <>
                {post?.data.comments.map((comment) => {
                  return (
                    <PostComments
                      comment={comment}
                      key={comment.id}
                      post={post}
                    />
                  );
                })}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <HR className="my-4" />
        <div className="flex gap-3 items-center justify-between px-6 pb-6">
          <div className="w-14">
            <Avatar img={post?.profile.avatar} alt="profile" className="max-w-fit" rounded />
          </div>
          <TextInput
            type="text"
            sizing="md"
            className="form-control sm:w-full w-auto"
            placeholder="Comment"
            value={comText}
            onChange={(e) => setComText(e.target.value)}
          />
          <Button
            onClick={() => onSubmit(post?.id, comText)}
            color={"primary"}>
            Comment
          </Button>
        </div>

      </CardBox>
    </>
  );
};

export default PostItem;
