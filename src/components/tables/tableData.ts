import img1 from "/public/images/profile/user-11.jpg";
import img2 from "/public/images/profile/user-8.jpg";
import img3 from "/public/images/profile/user-3.jpg";
import img4 from "/public/images/profile/user-4.jpg";
import img5 from "/public/images/profile/user-5.jpg";
import img6 from "/public/images/profile/user-6.jpg";
import img7 from "/public/images/profile/user-7.jpg";
import img8 from "/public/images/profile/user-10.jpg";
import img9 from "/public/images/profile/user-12.jpg";
import authimg1 from "/public/images/blog/blog-img1.jpg";
import authimg2 from "/public/images/blog/blog-img2.jpg";
import authimg3 from "/public/images/blog/blog-img3.jpg";
import authimg4 from "/public/images/blog/blog-img4.jpg";
import authimg5 from "/public/images/blog/blog-img5.jpg";
import { IconArrowBackUp, IconCheck, IconX } from "@tabler/icons-react";

export interface TableType {
  avatar?: any;
  name?: string;
  post?: string;
  pname?: string;
  teams: {
    id: string;
    color: string;
    text: string;
  }[];
  status?: string;
  statuscolor?: string;
  budget?: string;
}





const basicTableData: TableType[] = [
  {
    avatar: img1,
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    status: "Active",
    statuscolor: "success",
    teams: [
      {
        id: "1",
        color: "error",
        text: "S",
      },
      {
        id: "2",
        color: "secondary   ",
        text: "D",
      },
    ],
    budget: "$3.9",
  },
  {
    avatar: img2,
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    status: "Pending",
    statuscolor: "warning",
    teams: [
      {
        id: "1",
        color: "secondary",
        text: "N",
      },
      {
        id: "2",
        color: "warning   ",
        text: "X",
      },
      {
        id: "3",
        color: "primary   ",
        text: "A",
      },
    ],
    budget: "$24.5k",
  },
  {
    avatar: img3,
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    status: "Completed",
    statuscolor: "primary",
    teams: [
      {
        id: "1",
        color: "secondary",
        text: "X",
      },
    ],
    budget: "$12.8k",
  },
  {
    avatar: img7,
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    status: "Active",
    statuscolor: "success",
    teams: [
      {
        id: "1",
        color: "primary",
        text: "X",
      },
      {
        id: "2",
        color: "error",
        text: "Y",
      },
    ],
    budget: "$2.4k",
  },
  {
    avatar: img5,
    name: "Micheal Doe",
    post: "Content Writer",
    pname: "Helping Hands WP Theme",
    status: "Cancel",
    statuscolor: "error",
    teams: [
      {
        id: "1",
        color: "secondary",
        text: "S",
      },
    ],
    budget: "$9.3k",
  },
];


export interface TableType2 {
  avatar?: any;
  name?: string;
  post?: string;
  users: {
    id: string;
    icon: any;
  }[];
  status?: string;
  statuscolor?: string;
  budget?: string;
}

const basicTableData2: TableType2[] = [
  {
      avatar: img4,
      name: 'Olivia Rhye',
      post: 'Xtreme admin',
      status: 'active',
      statuscolor: 'primary',
      users: [
          {
              id: '1',
              icon: img2
          },
          {
              id: '2',
              icon: img1
          }
      ]
  },
  {
      avatar: img8,
      name: 'Barbara Steele',
      post: 'Adminpro admin',
      status: 'cancel',
      statuscolor: 'error',
      users: [
          {
              id: '1',
              icon: img3
          },
          {
              id: '2',
              icon: img2
          },
          {
              id: '3',
              icon: img1
          }
      ]
  },
  {
      avatar: img3,
      name: 'Leonard Gordon',
      post: 'Monster admin',
      status: 'active',
      statuscolor: 'primary',
      users: [
          {
              id: '1',
              icon: img2
          },
          {
              id: '2',
              icon: img3
          }
      ]
  },
  {
      avatar: img4,
      name: 'Evelyn Pope',
      post: 'matdashpro admin',
      status: 'pending',
      statuscolor: 'success',
      users: [
          {
              id: '1',
              icon: img3
          },
          {
              id: '2',
              icon: img2
          },
          {
              id: '3',
              icon: img1
          }
      ]
  },
  {
      avatar: img5,
      name: 'Tommy Garza',
      post: 'Elegant admin',
      status: 'cancel',
      statuscolor: 'error',
      users: [
          {
              id: '1',
              icon: img6
          },
          {
              id: '2',
              icon: img5
          }
      ]
  },
  {
      avatar: img9,
      name: 'Isabel Vasquez',
      post: 'Modernize admin',
      status: 'pending',
      statuscolor: 'success',
      users: [
          {
              id: '1',
              icon: img4
          },
          {
              id: '2',
              icon: img2
          }
      ]
  }
];


export interface TableType3 {
  avatar?: any;
  name?: string;
  handle?: string;
  teams: {
    status: string;
    statuscolor: string;
  }[];
  status?: string;
  statusoffline?:boolean;
  statuscolor?: string;
  email?: string;
}

/*Basic Table 3*/
const basicTableData3: TableType3[] = [
  {
      avatar: img4,
      name: 'Olivia Rhye',
      handle: '@rhye',
      status: 'active',
      statuscolor: 'lightsuccess',
      statusoffline:false,
      email: 'olivia@ui.com',
      teams: [
          {
              status: 'Design',
              statuscolor: 'primary'
          },
          {
              status: 'Product',
              statuscolor: 'secondary'
          }
      ]
  },
  {
      avatar: img9,
      name: 'Barbara Steele',
      handle: '@steele',
      status: 'offline',
      statusoffline:true,
      statuscolor: 'muted',
      email: 'steele@ui.com',
      teams: [
          {
              status: 'Product',
              statuscolor: 'secondary'
          },
          {
              status: 'Operations',
              statuscolor: 'error'
          }
      ]
  },
  {
      avatar: img3,
      name: 'Leonard Gordon',
      handle: '@gordon',
      status: 'active',
      statusoffline:false,
      statuscolor: 'lightsuccess',
      email: 'olivia@ui.com',
      teams: [
          {
              status: 'Finance',
              statuscolor: 'primary'
          },
          {
              status: 'Customer Success',
              statuscolor: 'success'
          }
      ]
  },
  {
      avatar: img4,
      name: 'Evelyn Pope',
      handle: '@pope',
      status: 'offline',
      statusoffline:true,
      statuscolor: 'muted',
      email: 'steele@ui.com',
      teams: [
          {
              status: 'Operations',
              statuscolor: 'error'
          },
          {
              status: 'Design',
              statuscolor: 'primary'
          }
      ]
  },
  {
      avatar: img5,
      name: 'Tommy Garza',
      handle: '@garza',
      status: 'active',
      statusoffline:false,
      statuscolor: 'lightsuccess',
      email: 'olivia@ui.com',
      teams: [
          {
              status: 'Product',
              statuscolor: 'secondary'
          }
      ]
  },
  {
      avatar: img9,
      name: 'Isabel Vasquez',
      handle: '@vasquez',
      status: 'active',
      statusoffline:false,
      statuscolor: 'lightsuccess',
      email: 'steele@ui.com',
      teams: [
          {
              status: 'Customer Success',
              statuscolor: 'success'
          }
      ]
  }
];


export interface TableType4 {
  avatar?: any;
  name?: string;
  handle?: string;
  status?: string;
  invoice?:string;
  statuscolor?: string;
  statusicon?: any;
  progress?:any;
}

/*Basic Table 4*/
const basicTableData4: TableType4[] = [
  {
      invoice: 'INV-3066',
      status: 'paid',
      statuscolor: 'primary',
      statusicon: IconCheck,
      avatar: img8,
      name: 'Olivia Rhye',
      handle: 'olivia@ui.com',
      progress: 60
  },
  {
      invoice: 'INV-3067',
      status: 'cancelled',
      statuscolor: 'error',
      statusicon: IconX,
      avatar: img4,
      name: 'Barbara Steele',
      handle: 'steele@ui.com',
      progress: 30
  },
  {
      invoice: 'INV-3068',
      status: 'paid',
      statuscolor: 'primary',
      statusicon: IconCheck,
      avatar: img3,
      name: 'Leonard Gordon',
      handle: 'olivia@ui.com',
      progress: 45
  },
  {
      invoice: 'INV-3069',
      status: 'refunded',
      statuscolor: 'secondary',
      statusicon: IconArrowBackUp,
      avatar: img4,
      name: 'Evelyn Pope',
      handle: 'steele@ui.com',
      progress: 37
  },
  {
      invoice: 'INV-3070',
      status: 'cancelled',
      statuscolor: 'error',
      statusicon: IconX,
      avatar: img5,
      name: 'Tommy Garza',
      handle: 'olivia@ui.com',
      progress: 87
  },
  {
      invoice: 'INV-3071',
      status: 'refunded',
      statuscolor: 'secondary',
      statusicon: IconArrowBackUp,
      avatar: img9,
      name: 'Isabel Vasquez',
      handle: 'steele@ui.com',
      progress: 32
  }
];


export interface TableType5 {
  id?: string;
  avatar?: any;
  name?: string;
  handle?: string;
  courses: {
    status: string;
    statuscolor: string;
  }[];
  users?: string;
}

/*Basic Table 3*/
const basicTableData5: TableType5[] = [
  {
    avatar: authimg1,
    name: 'Top Authors',
    handle: 'Successful Fellas',
    users: '4300 Users',
    courses: [
        {
            status: 'Angular',
            statuscolor: 'error'
        },
        {
            status: 'PHP',
            statuscolor: 'primary'
        }
    ]
},
{
    avatar: authimg2,
    name: 'Popular Authors',
    handle: 'Most Successful',
    users: '1200 Users',
    courses: [
        {
            status: 'Bootstrap',
            statuscolor: 'primary'
        }
    ]
},
{
    avatar: authimg3,
    name: 'New Users',
    handle: 'Awesome Users',
    users: '2000 Users',
    courses: [
        {
            status: 'Reactjs',
            statuscolor: 'success'
        },
        {
            status: 'Angular',
            statuscolor: 'error'
        }
    ]
},
{
    avatar: authimg4,
    name: 'Active Customers',
    handle: 'Best Customers',
    users: '1500 Users',
    courses: [
        {
            status: 'Bootstrap',
            statuscolor: 'primary'
        }
    ]
},
{
    avatar: authimg5,
    name: 'Bestseller Theme',
    handle: 'Amazing Templates',
    users: '9500 Users',
    courses: [
        {
            status: 'Angular',
            statuscolor: 'error'
        },
        {
            status: 'Reactjs',
            statuscolor: 'success'
        }
    ]
}
];



export { basicTableData,basicTableData2,basicTableData3,basicTableData4,basicTableData5 };
