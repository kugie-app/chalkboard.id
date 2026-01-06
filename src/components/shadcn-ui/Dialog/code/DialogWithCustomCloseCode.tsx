import React from 'react'
import CodeModal from '../../CodeModal'

const DialogWithCustomCloseCode = () => {
  return (
    <CodeModal>
        {
            `
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn-ui/Default-Ui/dialog"
import { Button } from '@/components/shadcn-ui/Default-Ui/button'


<Dialog>
    <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md ">
        <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
                Anyone who has this link will be able to view this.
            </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Link
                </Label>
                <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                />
            </div>
            <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy />
            </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="error">
                    Close
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>
<Dialog>
    <DialogTrigger asChild>
        <Button variant="outlinesecondary">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md ">
        <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
                Anyone who has this link will be able to view this.
            </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Link
                </Label>
                <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                />
            </div>
            <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy />
            </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="warning">
                    Close
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>
<Dialog>
    <DialogTrigger asChild>
        <Button variant="outlinewarning">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md ">
        <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
                Anyone who has this link will be able to view this.
            </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Link
                </Label>
                <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                />
            </div>
            <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy />
            </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="error">
                    Close
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>
<Dialog>
    <DialogTrigger asChild>
        <Button variant="outlineerror">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md ">
        <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
                Anyone who has this link will be able to view this.
            </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Link
                </Label>
                <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                />
            </div>
            <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy />
            </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
                <Button type="button" variant="warning">
                    Close
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>
            `
        }
    </CodeModal>
  )
}

export default DialogWithCustomCloseCode