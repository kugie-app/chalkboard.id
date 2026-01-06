import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import logo from "/public/images/front-pages/background/white-icon-logo.svg";
import Image from "next/image";
import FullLogo from "/public/images/front-pages/background/white-logo.svg";

export const Footer = () => {
  const navLinks1 = [
    {
      key: "link1",
      title: "Cards",
      link: "/widgets/cards",
    },
    {
      key: "link2",
      title: "Pricing",
      link: "/theme-pages/pricing",
    },
    {
      key: "link4",
      title: "FAQ",
      link: "/theme-pages/faq",
    },
    {
      key: "link5",
      title: "Casl",
      link: "/theme-pages/casl",
    },
  ];
  const navLinks2 = [
    {
      key: "link1",
      title: "Banners",
      link: "/widgets/banners",
    },
    {
      key: "link2",
      title: "Charts",
      link: "/widgets/charts",
    },
    {
      key: "link3",
      title: "Headless Radio",
      link: "/headless-form/radiogroup",
    },
    {
      key: "link4",
      title: "Gallery",
      link: "/apps/user-profile/gallery",
    },
    {
      key: "link5",
      title: "Buttons",
      link: "/ui-components/buttons",
    },
  ];
  const navLinks3 = [
    {
      key: "link1",
      title: "Form Layouts",
      link: "/forms/form-layouts",
    },
    {
      key: "link2",
      title: "Tables",
      link: "/tables/basic",
    },
    {
      key: "link3",
      title: "React Table",
      link: "/react-tables/basic",
    },
    {
      key: "link4",
      title: "Form Elements",
      link: "/forms/form-elements",
    },
    {
      key: "link5",
      title: "Validation",
      link: "/forms/form-validation",
    },
  ];
  return (
    <>
      <div className="bg-sky">
        <div className="container-1218 mx-auto ">
          <div className="border-b border-darkborder lg:py-24 py-12">
            <div className="grid grid-cols-12 gap-30 ">
              <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                <Image src={FullLogo} alt="logo" className="mb-8" />
                <div className="flex flex-col gap-4">
                  {navLinks1.map((item) => {
                    return (
                      <Link
                        key={item.key}
                        href={item.link}
                        className="text-sm text-lightmuted hover:text-primary block"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                <h4 className="text-17 text-white font-semibold mb-8">
                  Features
                </h4>
                <div className="flex flex-col gap-4">
                  {navLinks2.map((item) => {
                    return (
                      <Link
                        key={item.key}
                        href={item.link}
                        className="text-sm text-lightmuted hover:text-primary block"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                <h4 className="text-17 text-white font-semibold mb-8">
                  Resources
                </h4>
                <div className="flex flex-col gap-4">
                  {navLinks3.map((item) => {
                    return (
                      <Link
                        key={item.key}
                        href={item.link}
                        className="text-sm text-lightmuted hover:text-primary block"
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                <h4 className="text-17 text-white font-semibold mb-8">
                  Follow us
                </h4>
                <div className="flex items-center gap-5">
                  <Tooltip
                    content="Facebook"
                    placement="bottom"
                    className="shrink-0"
                  >
                    <Link href="/">
                      <Image
                        src="/images/front-pages/background/facebook.svg"
                        height={22}
                        width={22}
                        alt="icon"
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content="Twitter"
                    placement="bottom"
                    className="shrink-0"
                  >
                    <Link href="/">
                      <Image
                        src="/images/front-pages/background/twitter.svg"
                        height={22}
                        width={22}
                        alt="icon"
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content="Instagram"
                    placement="bottom"
                    className="shrink-0"
                  >
                    <Link href="/">
                      <Image
                        src="/images/front-pages/background/instagram.svg"
                        height={22}
                        width={22}
                        alt="icon"
                      />
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-1218 mx-auto ">
          <div className="flex md:justify-between justify-center items-center flex-wrap md:py-10 py-8">
            <div className="flex items-center gap-3">
              <Image src={logo} alt="logo" height={24} />
              <p className="text-15 text-lightmuted ">
                All rights reserved by MatDash.
              </p>
            </div>
            <p className="text-15 text-lightmuted  flex items-center gap-1 md:pt-0 pt-3">
              Produced by{" "}
              <Link
                className="text-white text-primary-ld"
                href="https://adminmart.com/"
              >
                Adminmart
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
