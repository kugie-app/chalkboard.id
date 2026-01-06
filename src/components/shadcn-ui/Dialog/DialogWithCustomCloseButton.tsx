
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
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
import BasicDialogCode from './code/BasicDialogCode'
import { Label } from '@/components/shadcn-ui/Default-Ui/label'
import { Input } from '@/components/shadcn-ui/Default-Ui/input'
import { Copy } from 'lucide-react'


const DialogWithCustomCloseButton = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Dialog With Custom Close</h4>
                <BasicDialogCode />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
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
            </div>
        </CardBox>
    )
}

export default DialogWithCustomCloseButton