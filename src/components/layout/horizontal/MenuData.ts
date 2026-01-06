import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: "solar:layers-line-duotone",
    href: "",
    children: [
      {
        title: "Dashboard",
        icon: "solar:atom-line-duotone",
        id: uniqueId(),
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Tables",
        icon: "solar:home-angle-linear",
        href: "",
        children: [
          {
            title: "Tables",
            id: uniqueId(),
            href: "/tables",
          },
          {
            title: "Tables",
            id: uniqueId(),
            href: "/tables",
          },
          {
            title: "Tables",
            id: uniqueId(),
            href: "/tables",
          },
          {
            title: "Blog Details",
            id: uniqueId(),
            href: "/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
          },
          {
            title: "Contact Us",
            id: uniqueId(),
            href: "/frontend-pages/contact",
          },
          {
            title: "Portfolio",
            id: uniqueId(),
            href: "/frontend-pages/portfolio",
          },
          {
            title: "Pricing",
            id: uniqueId(),
            href: "/frontend-pages/pricing",
          },
        ],
      },
      {
        title: "Landingpage",
        icon: "solar:bill-list-line-duotone",
        id: uniqueId(),
        href: "/landingpage",
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Apps",
    icon: "solar:widget-line-duotone",
    href: "",
    children: [
      {
        id: uniqueId(),
        title: "Contacts",
        icon: "solar:phone-line-duotone",
        href: "/apps/contacts",
      },
      {
        id: uniqueId(),
        title: "Chats",
        icon: "solar:chat-round-line-line-duotone",
        href: "/apps/chats",
      },
      {
        id: uniqueId(),
        title: "Notes",
        icon: "solar:document-text-line-duotone",
        href: "/apps/notes",
      },
      {
        id: uniqueId(),
        title: "Calendar",
        icon: "solar:calendar-mark-line-duotone",
        href: "/apps/calendar",
      },
      {
        id: uniqueId(),
        title: "Email",
        icon: "solar:letter-line-duotone",
        href: "/apps/email",
      },
      {
        id: uniqueId(),
        title: "Tickets",
        icon: "solar:ticker-star-outline",
        href: "/apps/tickets",
      },
      {
        id: uniqueId(),
        title: "Kanban",
        icon: "solar:notebook-linear",
        href: "/apps/kanban",
      },
      {
        id: uniqueId(),
        title: "User Profile",
        icon: "solar:shield-user-outline",
        href: "",
        children: [
          {
            id: uniqueId(),
            title: "Profile",
            href: "/apps/user-profile/profile",
          },
          {
            id: uniqueId(),
            title: "Followers",
            href: "/apps/user-profile/followers",
          },
          {
            id: uniqueId(),
            title: "Friends",
            href: "/apps/user-profile/friends",
          },
          {
            id: uniqueId(),
            title: "Gallery",
            href: "/apps/user-profile/gallery",
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Ecommerce",
        icon: "solar:document-text-line-duotone",
        href: "",
        children: [
          {
            id: uniqueId(),
            title: "Shop",
            href: "/apps/ecommerce/shop",
          },
          {
            id: uniqueId(),
            title: "Details",
            href: "/apps/ecommerce/detail/1",
          },
          {
            id: uniqueId(),
            title: "List",
            href: "/apps/ecommerce/list",
          },
          {
            id: uniqueId(),
            title: "Checkout",
            href: "/apps/ecommerce/checkout",
          },
          {
            id: uniqueId(),
            title: "Add Product",
            href: "/apps/ecommerce/addproduct",
          },
          {
            id: uniqueId(),
            title: "Edit Product",
            href: "/apps/ecommerce/editproduct",
          },
        ],
      },
      {
        title: "Invoice",
        id: uniqueId(),
        icon: "solar:bill-check-outline",
        href: "",
        children: [
          {
            id: uniqueId(),
            title: "List",
            href: "/apps/invoice/list",
          },
          {
            id: uniqueId(),
            title: "Details",
            href: "/apps/invoice/detail/PineappleInc",
          },
          {
            id: uniqueId(),
            title: "Create",
            href: "/apps/invoice/create",
          },
          {
            id: uniqueId(),
            title: "Edit",
            href: "/apps/invoice/edit/PineappleInc",
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Blogs",
        icon: "solar:widget-add-line-duotone",
        href: "/apps/blog/",
        children: [
          {
            id: uniqueId(),
            title: "Blog Post",
            href: "/apps/blog/post",
          },
          {
            id: uniqueId(),
            title: "Blog Detail",
            href: "/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
          },
        ],
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Ui Elements",
    icon: "solar:palette-round-line-duotone",
    column: 4,
    href: "",
    children: [
      {
        id: uniqueId(),
        title: "Accordian",
        icon: "solar:waterdrops-line-duotone",
        href: "/ui-components/accrodian",
      },
      {
        id: uniqueId(),
        title: "Badge",
        icon: "solar:tag-horizontal-line-duotone",
        href: "/ui-components/badge",
      },
      {
        id: uniqueId(),
        title: "Button",
        icon: "solar:airbuds-case-minimalistic-line-duotone",
        href: "/ui-components/buttons",
      },
      {
        id: uniqueId(),
        title: "Dropdowns",
        icon: "solar:airbuds-case-line-duotone",
        href: "/ui-components/dropdown",
      },
      {
        id: uniqueId(),
        title: "Modals",
        icon: "solar:bolt-line-duotone",
        href: "/ui-components/modals",
      },
      {
        id: uniqueId(),
        title: "Tab",
        icon: "solar:box-minimalistic-line-duotone",
        href: "/ui-components/tab",
      },
      {
        id: uniqueId(),
        title: "Tooltip",
        icon: "solar:feed-line-duotone",
        href: "/ui-components/tooltip",
      },
      {
        id: uniqueId(),
        title: "Alert",
        icon: "solar:flag-line-duotone",
        href: "/ui-components/alert",
      },
      {
        id: uniqueId(),
        title: "Progressbar",
        icon: "solar:programming-line-duotone",
        href: "/ui-components/progressbar",
      },
      {
        id: uniqueId(),
        title: "Pagination",
        icon: "solar:waterdrops-line-duotone",
        href: "/ui-components/pagination",
      },
      {
        id: uniqueId(),
        title: "Breadcrumbs",
        icon: "solar:slider-minimalistic-horizontal-line-duotone",
        href: "/ui-components/breadcrumb",
      },
      {
        id: uniqueId(),
        title: "Drawer",
        icon: "solar:laptop-minimalistic-line-duotone",
        href: "/ui-components/drawer",
      },
      {
        id: uniqueId(),
        title: "Lists",
        icon: "solar:checklist-bold-duotone",
        href: "/ui-components/listgroup",
      },
      {
        id: uniqueId(),
        title: "Carousel",
        icon: "solar:align-horizonta-spacing-line-duotone",
        href: "/ui-components/carousel",
      },
      {
        id: uniqueId(),
        title: "Spinner",
        icon: "solar:soundwave-bold-duotone",
        href: "/ui-components/spinner",
      },
      {
        id: uniqueId(),
        title: "Avatar",
        icon: "solar:user-line-duotone",
        href: "/ui-components/avatar",
      },
      {
        id: uniqueId(),
        title: "Banner",
        icon: "solar:banknote-linear",
        href: "/ui-components/banner",
      },
      {
        id: uniqueId(),
        title: "Button Group",
        icon: "solar:users-group-two-rounded-outline",
        href: "/ui-components/button-group",
      },
      {
        id: uniqueId(),
        title: "Card",
        icon: "solar:card-line-duotone",
        href: "/ui-components/card",
      },
      {
        id: uniqueId(),
        title: "Datepicker",
        icon: "solar:calendar-search-linear",
        href: "/ui-components/datepicker",
      },
      {
        id: uniqueId(),
        title: "Footer",
        icon: "solar:wad-of-money-outline",
        href: "/ui-components/footer",
      },
      {
        id: uniqueId(),
        title: "KBD",
        icon: "solar:keyboard-line-duotone",
        href: "/ui-components/kbd",
      },
      {
        id: uniqueId(),
        title: "Mega Menu",
        icon: "solar:clipboard-list-linear",
        href: "/ui-components/megamenu",
      },
      {
        id: uniqueId(),
        title: "Navbar",
        icon: "solar:slider-minimalistic-horizontal-linear",
        href: "/ui-components/navbar",
      },
      {
        id: uniqueId(),
        title: "Popover",
        icon: "solar:chat-line-line-duotone",
        href: "/ui-components/popover",
      },
      {
        id: uniqueId(),
        title: "Rating",
        icon: "solar:stars-linear",
        href: "/ui-components/rating",
      },
      {
        id: uniqueId(),
        title: "Sidebar",
        icon: "solar:siderbar-broken",
        href: "/ui-components/sidebar",
      },
      {
        id: uniqueId(),
        title: "Tables",
        icon: "solar:bedside-table-linear",
        href: "/ui-components/tables",
      },
      {
        id: uniqueId(),
        title: "Timeline",
        icon: "solar:align-horizontal-center-outline",
        href: "/ui-components/timeline",
      },
      {
        id: uniqueId(),
        title: "Toast",
        icon: "solar:check-square-linear",
        href: "/ui-components/toast",
      },
      {
        id: uniqueId(),
        title: "Typography",
        icon: "solar:text-bold-duotone",
        href: "/ui-components/typography",
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Headless UI",
    column: 4,
    icon: "solar:text-underline-cross-broken",
    href: "",
    children: [
      {
        title: "Dropdown",
        icon: "solar:round-alt-arrow-down-outline",
        id: uniqueId(),
        href: "/headless-ui/dropdown",
      },
      {
        title: "Disclosure",
        icon: "solar:accumulator-broken",
        id: uniqueId(),
        href: "/headless-ui/disclosure",
      },
      {
        title: "Dialog",
        icon: "solar:smartphone-update-line-duotone",
        id: uniqueId(),
        href: "/headless-ui/dialog",
      },
      {
        title: "Popover",
        icon: "solar:airbuds-case-charge-line-duotone",
        id: uniqueId(),
        href: "/headless-ui/popover",
      },
      {
        title: "Tabs",
        icon: "solar:clapperboard-text-linear",
        id: uniqueId(),
        href: "/headless-ui/tabs",
      },
      {
        title: "Transition",
        icon: "solar:round-transfer-horizontal-line-duotone",
        id: uniqueId(),
        href: "/headless-ui/transition",
      },

      {
        id: uniqueId(),
        title: "Buttons",
        icon: "solar:adhesive-plaster-outline",
        href: "/headless-form/buttons",
      },
      {
        id: uniqueId(),
        title: "Checkbox",
        icon: "solar:check-circle-linear",
        href: "/headless-form/checkbox",
      },
      {
        id: uniqueId(),
        title: "Combobox",
        icon: "solar:archive-down-minimlistic-broken",
        href: "/headless-form/combobox",
      },
      {
        id: uniqueId(),
        title: "Fieldset",
        icon: "solar:password-minimalistic-input-outline",
        href: "/headless-form/fieldset",
      },
      {
        id: uniqueId(),
        title: "Input",
        icon: "solar:text-italic-circle-linear",
        href: "/headless-form/input",
      },
      {
        id: uniqueId(),
        title: "Listbox",
        icon: "solar:list-check-linear",
        href: "/headless-form/listbox",
      },
      {
        id: uniqueId(),
        title: "Radio Group",
        icon: "solar:round-graph-linear",
        href: "/headless-form/radiogroup",
      },
      {
        id: uniqueId(),
        title: "Select",
        icon: "solar:minimize-square-3-outline",
        href: "/headless-form/select",
      },
      {
        id: uniqueId(),
        title: "Switch",
        icon: "solar:branching-paths-down-outline",
        href: "/headless-form/switch",
      },
      {
        id: uniqueId(),
        title: "Textarea",
        icon: "solar:text-square-2-linear",
        href: "/headless-form/textarea",
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Shadcn UI",
    column: 4,
    icon: "solar:command-broken",
    href: "/shadcn/",
    children: [
      {
        title: "Accordion",
        icon: "solar:round-alt-arrow-down-outline",
        id: uniqueId(),
        href: "/shadcn-ui/accordion",
      },
      {
        id: uniqueId(),
        title: "Badge",
        icon: "solar:tag-horizontal-line-duotone",
        href: "/shadcn-ui/badge",
      },
      {
        id: uniqueId(),
        title: "Button",
        icon: "solar:airbuds-case-minimalistic-line-duotone",
        href: "/shadcn-ui/buttons",
      },
      {
        id: uniqueId(),
        title: "Dropdowns",
        icon: "solar:airbuds-case-line-duotone",
        href: "/shadcn-ui/dropdown",
      },
      {
        id: uniqueId(),
        title: "Dialogs",
        icon: "solar:bolt-line-duotone",
        href: "/shadcn-ui/dialogs",
      },
      {
        id: uniqueId(),
        title: "Tab",
        icon: "solar:box-minimalistic-line-duotone",
        href: "/shadcn-ui/tab",
      },
      {
        id: uniqueId(),
        title: "Tooltip",
        icon: "solar:feed-line-duotone",
        href: "/shadcn-ui/tooltip",
      },
      {
        id: uniqueId(),
        title: "Alert",
        icon: "solar:flag-line-duotone",
        href: "/shadcn-ui/alert",
      },
      {
        id: uniqueId(),
        title: "Progressbar",
        icon: "solar:programming-line-duotone",
        href: "/shadcn-ui/progressbar",
      },
      {
        id: uniqueId(),
        title: "Breadcrumbs",
        icon: "solar:slider-minimalistic-horizontal-line-duotone",
        href: "/shadcn-ui/breadcrumb",
      },
      {
        id: uniqueId(),
        title: "Drawer",
        icon: "solar:laptop-minimalistic-line-duotone",
        href: "/shadcn-ui/drawer",
      },
      {
        id: uniqueId(),
        title: "Carousel",
        icon: "solar:align-horizonta-spacing-line-duotone",
        href: "/shadcn-ui/carousel",
      },
      {
        id: uniqueId(),
        title: "Skeleton",
        icon: "solar:soundwave-bold-duotone",
        href: "/shadcn-ui/skeleton",
      },
      {
        id: uniqueId(),
        title: "Avatar",
        icon: "solar:user-line-duotone",
        href: "/shadcn-ui/avatar",
      },
      {
        id: uniqueId(),
        title: "Card",
        icon: "solar:card-line-duotone",
        href: "/shadcn-ui/card",
      },
      {
        id: uniqueId(),
        title: "Datepicker",
        icon: "solar:calendar-search-linear",
        href: "/shadcn-ui/datepicker",
      },
      {
        id: uniqueId(),
        title: "Combobox",
        icon: "solar:wad-of-money-outline",
        href: "/shadcn-ui/combobox",
      },
      {
        id: uniqueId(),
        title: "Collapsible",
        icon: "solar:list-up-minimalistic-bold-duotone",
        href: "/shadcn-ui/collapsible",
      },
      {
        id: uniqueId(),
        title: "Command",
        icon: "solar:command-outline",
        href: "/shadcn-ui/command",
      },
      {
        id: uniqueId(),
        title: "Toast",
        icon: "solar:notification-unread-broken",
        href: "/shadcn-ui/toast",
      },
      {
        id: uniqueId(),
        title: "Input",
        icon: "solar:text-circle-linear",
        href: "/shadcn-form/input",
      },
      {
        id: uniqueId(),
        title: "Select",
        icon: "solar:round-alt-arrow-down-outline",
        href: "/shadcn-form/select",
      },
      {
        id: uniqueId(),
        title: "Checkbox",
        icon: "solar:shield-check-linear",
        href: "/shadcn-form/checkbox",
      },
      {
        id: uniqueId(),
        title: "Radio",
        icon: "solar:record-linear",
        href: "/shadcn-form/radio",
      },
    ],
  },

  {
    id: uniqueId(),
    title: "Pages",
    icon: "solar:book-outline",
    href: "",
    children: [
      {
        id: uniqueId(),
        title: "Widgets",
        icon: "solar:adhesive-plaster-outline",
        href: "/widgets/cards",
        children: [
          {
            id: uniqueId(),
            title: "Cards",
            href: "/widgets/cards",
          },
          {
            id: uniqueId(),
            title: "Banners",
            href: "/widgets/banners",
          },
          {
            id: uniqueId(),
            title: "Charts",
            href: "/widgets/charts",
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Auth",
        icon: "solar:lock-password-linear",
        href: "/400",
        children: [
          {
            id: uniqueId(),
            title: "Login",
            icon: "solar:key-square-line-duotone",
            href: "/auth/auth1/login",
            children: [
              {
                id: uniqueId(),
                title: "Side Login",

                href: "/auth/auth1/login",
              },
              {
                id: uniqueId(),
                title: "Boxed Login",

                href: "/auth/auth2/login",
              },
            ],
          },
          {
            id: uniqueId(),
            title: "Register",
            icon: "solar:user-check-rounded-broken",
            href: "/auth/auth1/register",
            children: [
              {
                id: uniqueId(),
                title: "Side Register",

                href: "/auth/auth1/register",
              },
              {
                id: uniqueId(),
                title: "Boxed Register",

                href: "/auth/auth2/register",
              },
            ],
          },
          {
            id: uniqueId(),
            title: "Forgot Password",
            icon: "solar:shield-cross-broken",
            href: "/auth/auth1/forgot-password",
            children: [
              {
                id: uniqueId(),
                title: "Side Forgot Pwd",

                href: "/auth/auth1/forgot-password",
              },
              {
                id: uniqueId(),
                title: "Boxed Forgot Pwd",

                href: "/auth/auth2/forgot-password",
              },
            ],
          },
          {
            id: uniqueId(),
            title: "Two Steps",
            icon: "solar:password-minimalistic-input-outline",
            href: "/auth/auth1/two-steps",
            children: [
              {
                id: uniqueId(),
                title: "Side Two Steps",

                href: "/auth/auth1/two-steps",
              },
              {
                id: uniqueId(),
                title: "Boxed Two Steps",

                href: "/auth/auth2/two-steps",
              },
            ],
          },
          {
            id: uniqueId(),
            title: "Others",
            icon: "solar:folder-error-linear",
            href: "",
            children: [
              {
                id: uniqueId(),
                title: "Error",
                href: "/auth/error",
              },
              {
                id: uniqueId(),
                title: "Maintenance",
                href: "/auth/maintenance",
              },
            ],
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Icons",
        icon: "solar:adhesive-plaster-outline",
        href: "/icons",
        children: [
          {
            id: uniqueId(),
            title: "Solar Icons",
            href: "/icons/solar",
          },
          {
            id: uniqueId(),
            title: "Tabler Icons",
            href: "/icons/tabler",
          },
        ],
      },

      {
        id: uniqueId(),
        title: "Charts",
        icon: "solar:chart-2-outline",
        href: "",
        children: [
          {
            title: "Line Chart",
            icon: "solar:chart-square-line-duotone",
            id: uniqueId(),
            href: "/charts/line",
          },
          {
            title: "Area Chart",
            icon: "solar:graph-new-broken",
            id: uniqueId(),
            href: "/charts/area",
          },
          {
            title: "Gradient Chart",
            icon: "solar:round-graph-outline",
            id: uniqueId(),
            href: "/charts/gradient",
          },
          {
            title: "Candlestick",
            icon: "solar:chandelier-outline",
            id: uniqueId(),
            href: "/charts/candlestick",
          },
          {
            title: "Column",
            icon: "solar:chart-2-bold-duotone",
            id: uniqueId(),
            href: "/charts/column",
          },
          {
            title: "Doughnut & Pie",
            icon: "solar:pie-chart-2-linear",
            id: uniqueId(),
            href: "/charts/doughnut",
          },
          {
            title: "Radialbar & Radar",
            icon: "solar:graph-line-duotone",
            id: uniqueId(),
            href: "/charts/radialbar",
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Forms",
    icon: "solar:file-text-linear",
    href: "",
    children: [
      {
        id: uniqueId(),
        title: "Forms Elements",
        icon: "solar:text-selection-line-duotone",
        href: "/forms/form-elements",
      },
      {
        id: uniqueId(),
        title: "Forms Layouts",
        icon: "solar:document-text-outline",
        href: "/forms/form-layouts",
      },
      {
        id: uniqueId(),
        title: "Forms Horizontal",
        icon: "solar:slider-horizontal-line-duotone",
        href: "/forms/form-horizontal",
      },
      {
        id: uniqueId(),
        title: "Forms Vertical",
        icon: "solar:slider-vertical-line-duotone",
        href: "/forms/form-vertical",
      },
      {
        id: uniqueId(),
        title: "Forms Custom",
        icon: "solar:document-text-outline",
        href: "/forms/form-custom",
      },
      {
        id: uniqueId(),
        title: "Form Validation",
        icon: "solar:bill-check-linear",
        href: "/forms/form-validation",
      },
    ],
  },

  

  {
    id: uniqueId(),
    title: "Tables",
    icon: "solar:tuning-square-2-line-duotone",
    href: "",
    children: [
      {
        title: "Basic Tables",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/basic",
      },
      {
        title: "Striped Rows Table",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/striped-row",
      },
      {
        title: "Hover Table",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/hover-table",
      },
      {
        title: "Checkbox Table",
        icon: "solar:tablet-line-duotone",
        id: uniqueId(),
        href: "/tables/checkbox-table",
      },
      {
        id: uniqueId(),
        title: "React Tables",
        icon: "solar:calendar-add-broken",
        href: "",
        children: [
          {
            id: uniqueId(),
            title: "Basic",
            href: "/react-tables/basic",
          },
          {
            id: uniqueId(),
            title: "Dense",
            href: "/react-tables/dense",
          },
          {
            id: uniqueId(),
            title: "Sorting",
            href: "/react-tables/sorting",
          },
          {
            id: uniqueId(),
            title: "Filtering",
            href: "/react-tables/filtering",
          },
          {
            id: uniqueId(),
            title: "Pagination",
            href: "/react-tables/pagination",
          },
          {
            id: uniqueId(),
            title: "Row Selection",
            href: "/react-tables/row-selection",
          },
          {
            id: uniqueId(),
            title: "Column Visibility",
            href: "/react-tables/columnvisibility",
          },
          {
            id: uniqueId(),
            title: "Editable",
            href: "/react-tables/editable",
          },
          {
            id: uniqueId(),
            title: "Sticky",
            href: "/react-tables/sticky",
          },
          {
            id: uniqueId(),
            title: "Drag & Drop",
            href: "/react-tables/drag-drop",
          },
          {
            id: uniqueId(),
            title: "Empty",
            href: "/react-tables/empty",
          },
          {
            id: uniqueId(),
            title: "Expanding",
            href: "/react-tables/expanding",
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Shadcn Table",
        icon: "solar:calendar-add-broken",
        href: "",
        children: [
          {
            id: uniqueId(),
            title: "Basic",
            href: "/shadcn-tables/basic",
          },
        ]
      },
    ],
  },
];
export default Menuitems;
