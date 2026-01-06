import React from 'react'
import CodeModal from '../../CodeModal'

const BasicTabCode = () => {
  return (
    <CodeModal>
        {
            `
import { Button } from "@/components/shadcn-ui/Default-Ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn-ui/Default-Ui/card"
import { Input } from "@/components/shadcn-ui/Default-Ui/input"
import { Label } from "@/components/shadcn-ui/Default-Ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/shadcn-ui/Default-Ui/tabs"
 
 <Tabs defaultValue="account" className="w-[400px]">
    <TabsList className="grid w-full grid-cols-2 bg-card h-12">
        <TabsTrigger value="account" className='data-[state=active]:bg-primary data-[state=active]:text-white py-2'>Account</TabsTrigger>
        <TabsTrigger value="password" className='data-[state=active]:bg-primary data-[state=active]:text-white py-2'>Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account" >
        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                    Make changes to your account here. Click save when you're done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    </TabsContent>
    <TabsContent value="password" >
        <Card className='' >
            <CardHeader>
                <CardTitle >Password</CardTitle>
                <CardDescription>
                    Change your password here. After saving, you'll be logged out.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save password</Button>
            </CardFooter>
        </Card>
    </TabsContent>
</Tabs>
            `
        }
    </CodeModal>
  )
}

export default BasicTabCode