"use client";
import React, { useContext } from "react";
import { orderBy } from "lodash";
import BlogPageCard from "./BlogPageCard";
import { BlogContext } from "@/app/context/BlogContext";

const BlogPageList = () => {
  const { posts, sortBy } = useContext(BlogContext);

  // Function to filter blog posts based on sorting criteria
  const filterBlogs = (posts: any[], sortBy: string) => {
    let filteredPosts = [...posts];

    if (sortBy === "newest") {
      filteredPosts = orderBy(filteredPosts, ["createdAt"], ["desc"]);
    } else if (sortBy === "oldest") {
      filteredPosts = orderBy(filteredPosts, ["createdAt"], ["asc"]);
    } else if (sortBy === "popular") {
      filteredPosts = orderBy(filteredPosts, ["view"], ["desc"]);
    }

    // Filter out featured posts
    return filteredPosts.filter((post) => !post.featured);
  };

  const blogPosts = filterBlogs(posts, sortBy);

  return (
    <div className="container-1218 mx-auto pb-12">
      <div className="grid grid-cols-12 gap-6">
        {blogPosts.map((post) => {
          return <BlogPageCard post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
};
export default BlogPageList;
