import React from "react";
import CodeModal from "../../CodeModal";

const BasicDropdownCode = () => {
  return (
    <CodeModal>
      {`
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn-ui/Default-Ui/dropdown-menu"
import { Button } from '@/components/shadcn-ui/Default-Ui/button'

<DropdownMenu>
    <DropdownMenuTrigger ><Button>Dropdown Button</Button></DropdownMenuTrigger>
    <DropdownMenuContent >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator  />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
<DropdownMenu>
    <DropdownMenuTrigger ><Button variant="secondary" >Dropdown Button</Button></DropdownMenuTrigger>
    <DropdownMenuContent >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator  />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
<DropdownMenu>
    <DropdownMenuTrigger><Button variant="warning" >Dropdown Button</Button></DropdownMenuTrigger>
    <DropdownMenuContent >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator  />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
<DropdownMenu>
    <DropdownMenuTrigger><Button variant="error">Dropdown Button</Button></DropdownMenuTrigger>
    <DropdownMenuContent >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator  />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>            
            `}
    </CodeModal>
  );
};

export default BasicDropdownCode;
