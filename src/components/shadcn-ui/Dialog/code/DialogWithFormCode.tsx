import React from 'react'
import CodeModal from '../../CodeModal'

const DialogWithFormCode = () => {
  return (
    <CodeModal>
     {
        `
<Dialog>
    <DialogTrigger asChild>
        <Button>Edit Profile</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Username
                </Label>
                <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                />
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">Save changes</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
<Dialog>
    <DialogTrigger asChild>
        <Button variant="secondary" >Edit Profile</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Name
                </Label>
                <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Username
                </Label>
                <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                />
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">Save changes</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
        `
     }   
    </CodeModal>
  )
}

export default DialogWithFormCode