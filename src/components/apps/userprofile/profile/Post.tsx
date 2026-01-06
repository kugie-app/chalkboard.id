import React, { useContext } from "react";
import PostBox from "./PostBox";
import PostIem from "./PostItem";
import { UserDataContext } from '@/app/context/UserDataContext/index';

const Post = () => {
  const { posts }: any = useContext(UserDataContext);

  return (
    <>
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="col-span-12">
          <PostBox />
        </div>
        {posts.map((posts: any) => {
          return (
            <div className="col-span-12" key={posts.id}>
              <PostIem post={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
