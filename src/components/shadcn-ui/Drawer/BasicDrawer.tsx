
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/shadcn-ui/Default-Ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/shadcn-ui/Default-Ui/drawer"
import BasicDrawerCode from './code/BasicDrawerCode'



const BasicDrawer = () => {
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }
    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Basic Drawer</h4>
                <BasicDrawerCode/>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button>Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent >
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Move Goal</DrawerTitle>
                                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 pb-0">
                                <div className="flex items-center justify-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={() => onClick(-10)}
                                        disabled={goal <= 200}
                                    >
                                        <Minus />
                                        <span className="sr-only">Decrease</span>
                                    </Button>
                                    <div className="flex-1 text-center">
                                        <div className="text-7xl font-bold tracking-tighter">
                                            {goal}
                                        </div>
                                        <div className="text-[0.70rem] uppercase text-muted-foreground">
                                            Calories/day
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={() => onClick(10)}
                                        disabled={goal >= 400}
                                    >
                                        <Plus />
                                        <span className="sr-only">Increase</span>
                                    </Button>
                                </div>
                            </div>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
                
            </div>
        </CardBox>
    )
}

export default BasicDrawer