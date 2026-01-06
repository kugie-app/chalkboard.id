//Apps Links Type & Data
interface appsLinkType {
  href: string;
  title: string;
  subtext: string;
  icon: string;
  iconbg: string;
  iconcolor: string;
}

const appsLink: appsLinkType[] = [
  {
    href: "https://kugie.app/contact",
    title: "Contact Support",
    subtext: "Contact us for any questions or support",
    icon: "solar:chat-line-bold-duotone",
    iconbg: "bg-lightprimary",
    iconcolor: "text-primary",
  }
];

interface LinkType {
  href: string;
  title: string;
}

const pageLinks: LinkType[] = [
  {
    href: "/theme-pages/pricing",
    title: "Pricing Page",
  },
  {
    href: "/auth/auth1/login",
    title: "Authentication Design",
  },
  {
    href: "/auth/auth1/register",
    title: "Register Now",
  },
  {
    href: "/404",
    title: "404 Error Page",
  },
  {
    href: "/apps/kanban",
    title: "Kanban App",
  },
  {
    href: "/apps/user-profile/profile",
    title: "User Application",
  },
  {
    href: "/apps/blog/post",
    title: "Blog Design",
  },
  {
    href: "/apps/ecommerce/checkout",
    title: "Shopping Cart",
  },
];

//   Search Data
interface SearchType {
  href: string;
  title: string;
}

const SearchLinks: SearchType[] = [
  {
    title: "Analytics",
    href: "/dashboards/analytics",
  },
  {
    title: "eCommerce",
    href: "/dashboards/eCommerce",
  },
  {
    title: "CRM",
    href: "/dashboards/crm",
  },
  {
    title: "Contacts",
    href: "/dashboards/eCommerce",
  },
  {
    title: "Posts",
    href: "/dashboards/posts",
  },
  {
    title: "Details",
    href: "/dashboards/details",
  },
];

//   Notification Data
interface NotificationType {
  title: string;
  icon: any;
  subtitle: string;
  bgcolor: string;
  color: string;
  time: string;
}

const Notification: NotificationType[] = [
  {
    icon: "solar:widget-3-line-duotone",
    bgcolor: "bg-lighterror dark:bg-lighterror",
    color: "text-error",
    title: "Launch Admin",
    subtitle: "Just see the my new admin!",
    time: "9:30 AM",
  },
  {
    icon: "solar:calendar-line-duotone",
    bgcolor: "bg-lightprimary dark:bg-lightprimary",
    color: "text-primary",
    title: "Event Today",
    subtitle: "Just a reminder that you have event",
    time: "9:15 AM",
  },
  {
    icon: "solar:settings-line-duotone",
    bgcolor: "bg-lightsecondary dark:bg-lightsecondary",
    color: "text-secondary",
    title: "Settings",
    subtitle: "You can customize this template as you want",
    time: "4:36 PM",
  },
  {
    icon: "solar:widget-4-line-duotone",
    bgcolor: "bg-lightwarning dark:bg-lightwarning ",
    color: "text-warning",
    title: "Launch Admin",
    subtitle: "Just see the my new admin!",
    time: "9:30 AM",
  },
  {
    icon: "solar:calendar-line-duotone",
    bgcolor: "bg-lightprimary dark:bg-lightprimary",
    color: "text-primary",
    title: "Event Today",
    subtitle: "Just a reminder that you have event",
    time: "9:15 AM",
  },
  {
    icon: "solar:settings-line-duotone",
    bgcolor: "bg-lightsecondary dark:bg-lightsecondary",
    color: "text-secondary",
    title: "Settings",
    subtitle: "You can customize this template as you want",
    time: "4:36 PM",
  },
];

//  Profile Data
interface ProfileType {
  title: string;
  url: string;
}

const profileDD: ProfileType[] = [
  {
    title: "Sign Out",
    url: "#", // This will be handled by the signOut function
  },
];

export { appsLink, pageLinks, SearchLinks, Notification, profileDD };
