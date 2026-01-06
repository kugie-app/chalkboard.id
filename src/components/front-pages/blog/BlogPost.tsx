"use client";
import React from "react";
import { BlogProvider } from "@/app/context/BlogContext/index";
import BlogPageList from "./BlogPageList";

const BlogPost = () => {
  return (
    <>
      <BlogProvider>
       <BlogPageList/>
      </BlogProvider>
    </>
  )
}

export default BlogPost
