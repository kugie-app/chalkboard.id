"use client";
import { Icon } from "@iconify/react";
export const Highlights = () => {
  const ThemeFeature1 = [
    {
      key: "feature1",
      icon: "tabler:wand",
      title: "6 Theme Colors",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      key: "feature2",
      icon: "tabler:shield-lock",
      title: "NextAuth",
      bg: "bg-lightsecondary",
      text: "text-secondary",
    },
    {
      key: "feature3",
      icon: "tabler:brand-firebase",
      title: "Firebase",
      bg: "bg-lighterror",
      text: "text-error",
    },
    {
      key: "feature4",
      icon: "tabler:archive",
      title: "90+ Page Templates",
      bg: "bg-lightsuccess",
      text: "text-success",
    },
    {
      key: "feature5",
      icon: "tabler:adjustments",
      title: "45+ UI Components",
      bg: "bg-lightinfo",
      text: "text-info",
    },
    {
      key: "feature6",
      icon: "tabler:brand-tailwind",
      title: "Tailwind",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      key: "feature7",
      icon: "tabler:diamond",
      title: "3400+ Font Icons",
      bg: "bg-lightwarning",
      text: "text-warning",
    },
  ];
  const ThemeFeature2 = [
    {
      key: "feature1",
      icon: "tabler:database",
      title: "SWR",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      key: "feature2",
      icon: "tabler:tags",
      title: "i18 React",
      bg: "bg-lighterror",
      text: "text-error",
    },
    {
      key: "feature3",
      icon: "tabler:hexagons",
      title: "Flowbite React",
      bg: "bg-lightinfo",
      text: "text-info",
    },
    {
      key: "feature4",
      icon: "tabler:arrows-shuffle",
      title: "Easy to Customize",
      bg: "bg-lightsuccess",
      text: "text-success",
    },
  ];
  const ThemeFeature3 = [
    {
      key: "feature1",
      icon: "tabler:chart-pie",
      title: "Lots of Chart Options",
      bg: "bg-lightsecondary",
      text: "text-secondary",
    },
    {
      key: "feature2",
      icon: "tabler:layers-intersect",
      title: "Lots of Table Examples",
      bg: "bg-lightwarning",
      text: "text-warning",
    },
    {
      key: "feature3",
      icon: "tabler:refresh",
      title: "Regular Updates",
      bg: "bg-lightsuccess",
      text: "text-success",
    },
    {
      key: "feature4",
      icon: "tabler:book",
      title: "Detailed Documentation",
      bg: "bg-lightwarning",
      text: "text-warning",
    },
    {
      key: "feature5",
      icon: "tabler:calendar",
      title: "Calendar Design",
      bg: "bg-lightinfo",
      text: "text-info",
    },
    {
      key: "feature6",
      icon: "tabler:user-screen",
      title: "Dedicated Support",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
  ];
  return (
    <>
      <div className="dark:bg-dark">
        <div className="container-1218 mx-auto ">
          <div className=" lg:pt-24 pt-12 rounded-md overflow-hidden">
            <div className="marquee1-group flex gap-6">
              {[0, 1, 2, 3].map((item,index) => {
                return (
                  <div key={index} className="flex gap-6 mb-6">
                    {ThemeFeature1.map((item) => {
                      return (
                        <div
                          key={item.key}
                          className={`py-5 px-8 rounded-[16px] flex gap-3 items-center ${item.bg}`}
                        >
                          <Icon
                            icon={item.icon}
                            className={`text-2xl shrink-0 ${item.text}`}
                          />
                          <p
                            className={`text-15 font-semibold whitespace-nowrap ${item.text}`}
                          >
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="marquee2-group flex gap-6">
              {[0, 1, 2, 3, 4, 5].map((feature,index) => {
                return (
                  <div key={index} className="flex gap-6 mb-6">
                    {ThemeFeature2.map((item) => {
                      return (
                        <div
                          key={item.key}
                          className={`py-5 px-8 rounded-[16px] flex gap-3 items-center ${item.bg}`}
                        >
                          <Icon
                            icon={item.icon}
                            className={`text-2xl shrink-0 ${item.text}`}
                          />
                          <p
                            className={`text-15 font-semibold whitespace-nowrap ${item.text}`}
                          >
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="marquee1-group flex gap-6">
              {[0, 1, 2, 3].map((item,index) => {
                return (
                  <div key={index} className="flex gap-6 mb-6">
                    {ThemeFeature3.map((item) => {
                      return (
                        <div
                          key={item.key}
                          className={`py-5 px-8 rounded-[16px] flex gap-3 items-center ${item.bg}`}
                        >
                          <Icon
                            icon={item.icon}
                            className={`text-2xl shrink-0 ${item.text}`}
                          />
                          <p
                            className={`text-15 font-semibold whitespace-nowrap ${item.text}`}
                          >
                            {item.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
