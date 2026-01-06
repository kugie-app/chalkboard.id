"use client";
import React, { useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { FaQuoteLeft } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { uniqueId } from "lodash";
import type {
  BlogType,
} from "@/app/[locale]/(DashboardLayout)/types/apps/blog";
import CardBox from "@/components/shared/CardBox";
import Image from "next/image";
import {
  Avatar,
  Badge,
  Button,
  HR,
  List,
  Textarea,
  Tooltip,
} from "flowbite-react";
import BlogComment from "./BlogCommnets";
import { BlogContext, BlogContextProps } from '@/app/context/BlogContext/index';


const BlogDetailData = () => {
  const { posts, setLoading, addComment }: BlogContextProps = useContext(BlogContext);
  const pathName = usePathname();
  const getTitle: string | any = pathName.split('/').pop();
  const post = posts.find((p) => p.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') === getTitle);
  const [replyTxt, setReplyTxt] = React.useState("");

  const paramCase = (t: string) =>
    t
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const onSubmit = () => {
    if (!post || !post.id) return;
    const newComment = {
      id: uniqueId('#comm_'),
      profile: {
        id: uniqueId('#USER_'),
        avatar: post.author?.avatar || '',
        name: post.author?.name || '',
        time: 'Now',
      },
      comment: replyTxt,
      replies: [],
      postId: post.id,
    };
    addComment(post.id, newComment);
    setReplyTxt('');
  };

  // skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {post ? (
        <>
          <CardBox className="p-0 overflow-hidden">
            <div className="relative ">
              <div className="overflow-hidden max-h-[440px]">
                <Image
                  src={post?.coverImg}
                  alt="MatDash"
                  height={440}
                  width={1500}
                  className="w-100 object-cover object-center "
                />
              </div>
              <Badge color={"white"} className="absolute bottom-8 end-6">
                2 min Read
              </Badge>
            </div>
            <div className="flex justify-between items-center -mt-7 px-6">
              <div>
                <Tooltip content={post ? post?.author.name : ""} className="">
                  <Avatar img={post?.author.avatar} rounded />
                </Tooltip>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Badge color={"muted"} className="mt-3">
                {post?.category}
              </Badge>
              <h2 className="md:text-4xl text-2xl my-6">{post?.title}</h2>
              <div>
                <div className="flex gap-3">
                  <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-[15px]">
                    <Icon icon="solar:eye-outline" height="18" className="text-ld" />
                    {post?.view}
                  </div>
                  <div className="flex gap-2 items-center text-darklink dark:text-bodytext text-[15px]">
                    <Icon icon="solar:chat-line-outline"
                    height="18"
                      className="text-ld"
                    />{" "}
                    {post?.comments?.length || 0}
                  </div>
                  <div className="ms-auto flex gap-2 items-center  text-darklink dark:text-bodytext text-[15px]">
                    <GoDot 
                      size="16"
                      className="text-ld"
                    />
                    <small>
                      {post && post.createdAt ? format(new Date(post.createdAt), 'E, MMM d') : ''}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <HR className="my-0 mb-4" />
            <div className="px-6 pb-6">
              <h2 className="md:text-3xl text-2xl pb-5">Title of the paragraph</h2>
              <p className="text-darklink dark:text-bodytext">
                But you cannot figure out what it is or what it can do. MTA web
                directory is the simplest way in which one can bid on a link, or
                a few links if they wish to do so. The link directory on MTA
                displays all of the links it currently has, and does so in
                alphabetical order, which makes it much easier for someone to
                find what they are looking for if it is something specific and
                they do not want to go through all the other sites and links as
                well. It allows you to start your bid at the bottom and slowly
                work your way to the top of the list.
              </p>
              <br></br>
              <p className="text-darklink dark:text-bodytext">
                Gigure out what it is or what it can do. MTA web directory is
                the simplest way in which one can bid on a link, or a few links
                if they wish to do so. The link directory on MTA displays all of
                the links it currently has, and does so in alphabetical order,
                which makes it much easier for someone to find what they are
                looking for if it is something specific and they do not want to
                go through all the other sites and links as well. It allows you
                to start your bid at the bottom and slowly work your way to the
                top of the
              </p>
              <br></br>
              <p>
                <b className="text-ld">
                  This is strong text.
                </b>
              </p>
              <i>This is italic text.</i>
              <HR />
              <h3 className="text-xl mb-3">Unorder list.</h3>
              <List>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
              </List>
              <HR />
              <h3 className="text-xl mb-3">Order list.</h3>
              <List ordered>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
                <List.Item>Gigure out what it is or</List.Item>
                <List.Item>The links it currently</List.Item>
                <List.Item>It allows you to start your bid</List.Item>
              </List>
              <HR />
              <h3 className="text-xl mb-3">Quotes</h3>
              <div className="pt-5 pb-4 px-4 rounded-md border-s-2 border-primary bg-muted dark:bg-darkmuted flex gap-1 items-start">
                <FaQuoteLeft 
                  size={20}
                  className="text-ld -mt-1"
                />
                <h2 className="text-base font-bold">
                  Life is short, Smile while you still have teeth!
                </h2>
              </div>
            </div>
          </CardBox>
          <CardBox className="mt-6">
            <h5 className="text-xl mb-2">Post Comments</h5>
            <Textarea
              rows={4}
              value={replyTxt}
              className="form-control-textarea"
              onChange={(e) => setReplyTxt(e.target.value)}
            ></Textarea>
            <Button color={"primary"} className="w-fit mt-3" onClick={onSubmit}>
              Post Comment
            </Button>
            <div className="mt-6">
              <div className="flex gap-3 items-center">
                <h5 className="text-xl ">Comments</h5>
                <div className="h-8 w-8 rounded-full bg-lightprimary dark:bg-lightprimary flex items-center justify-center text-primary font-bold">
                  {post?.comments?.length || 0}
                </div>
              </div>
              <div>
                {post?.comments?.map((comment: BlogType | any) => {
                  return (
                    <BlogComment key={comment.id} comment={comment} />
                  );
                })}
              </div>
            </div>
          </CardBox>
        </>
      ) : (
        <p className="text-xl text-center py-6 font-bold">No Post Found</p>
      )}
    </>
  );
};
export default BlogDetailData;
