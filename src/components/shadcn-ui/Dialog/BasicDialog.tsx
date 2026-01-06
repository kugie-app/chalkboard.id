
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn-ui/Default-Ui/dialog"
import { Button } from '@/components/shadcn-ui/Default-Ui/button'
import BasicDialogCode from './code/BasicDialogCode'


const BasicDialog = () => {
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Basic Dialog</h4>
                  <BasicDialogCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <Dialog>
                    <DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle> 
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild><Button variant="secondary" >Open Dialog</Button></DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild><Button variant="warning" >Open Dialog</Button></DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild><Button variant="error" >Open Dialog</Button></DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </CardBox>
    )
}

export default BasicDialog