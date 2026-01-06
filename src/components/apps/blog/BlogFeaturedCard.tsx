"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { GoDot } from "react-icons/go";
import { format } from "date-fns";
import { Avatar, Badge, Card } from "flowbite-react";
import { BlogContext, BlogContextProps } from "@/app/context/BlogContext/index";
import React, { useEffect, useContext } from "react";
import { BlogPostType } from "@/app/[locale]/(DashboardLayout)/types/apps/blog";

interface Btype {
  post: BlogPostType;
  index: number;
}
const BlogFeaturedCard = ({ post, index }: Btype) => {
  const { coverImg, title, view, comments, category, author, createdAt }: any =
    post;
  const linkTo = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  const mainPost = index === 0;
  const { setLoading }: BlogContextProps = useContext(BlogContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {post ? (
        <div
          className={`lg:col-span-${mainPost ? 8 : 4
            } md:col-span-12 col-span-12`}
        >
          <Card
            className="w-full h-[400px] p-0 overflow-hidden flex-row shadow-none feature-card relative card-hover roun"
            imgSrc={coverImg}
          >
            <div className="absolute top-0 bottom-0 left-0 h-full w-full bg-black opacity-50 mix-blend-multiply  "></div>
            <div className="absolute w-full h-full left-0 p-6">
              <div className="flex flex-col h-full justify-between ">
                <div className="flex justify-between items-center">
                  <Avatar img={author?.avatar} rounded />
                  <Badge color={"primary"}>{category}</Badge>
                </div>
                <div>
                  <h2 className="text-2xl text-white my-6">
                    <Link href={`/apps/blog/detail/${linkTo}`}> {title}</Link>
                  </h2>
                  <div className="flex  gap-3">


                    <div className="flex gap-2 items-center text-white text-[15px]">
                      <Icon icon="solar:eye-outline" height="18" /> {view}
                    </div>
                    <div className="flex gap-2 items-center text-white text-[15px]">
                      <Icon icon="solar:chat-line-outline" height="18" />{" "}
                      {comments?.length}
                    </div>
                    <div className="ms-auto flex gap-2 items-center text-white text-[15px]">
                      <GoDot size="16" />
                      <small>{format(new Date(createdAt), "E, MMM d")}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
};
export default BlogFeaturedCard;
