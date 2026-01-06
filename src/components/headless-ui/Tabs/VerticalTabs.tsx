import React from "react";
import CardBox from "../../shared/CardBox";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import VerticalTabsCode from "./Code/VerticalTabsCode";
const categories = [
  {
    name: "Recent",
    posts: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
  },
  {
    name: "Popular",
    posts: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  },
  {
    name: "Trending",
    posts: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  },
  {
    name: "Extreme",
    posts: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  },
];
const VerticalTabs = () => {
  return (
    <div>
      <CardBox>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-semibold">Vertical Tabs</h4>
          <VerticalTabsCode />
        </div>
        <div className="w-full pb-5">
          <TabGroup vertical className="flex gap-3 ">
            <TabList className="flex flex-col gap-3">
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className="rounded-md py-2 px-4 text-sm font-semibold text-ld focus:outline-none data-[selected]:bg-primary data-[hover]:text-white data-[selected]:text-white data-[hover]:bg-primary data-[selected]:data-[hover]:bg-primary data-[focus]:outline-1 data-[focus]:outline-primary"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="w-full">
              {categories.map(({ name, posts }) => (
                <TabPanel
                  key={name}
                  className="rounded-xl bg-lightgray dark:bg-dark p-3"
                >
                  <ul>
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className="relative rounded-md p-3 text-sm transition hover:bg-white/5"
                      >
                        <a href="#" className="font-semibold text-ld ">
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                        <ul
                          className="flex gap-2 text-bodytext"
                          aria-hidden="true"
                        >
                          <li>{post.date}</li>
                          <li aria-hidden="true">&middot;</li>
                          <li>{post.commentCount} comments</li>
                          <li aria-hidden="true">&middot;</li>
                          <li>{post.shareCount} shares</li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </CardBox>
    </div>
  );
};

export default VerticalTabs;
