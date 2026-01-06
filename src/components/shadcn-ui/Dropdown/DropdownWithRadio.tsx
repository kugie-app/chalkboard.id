
"use client"
import React from 'react'
import CardBox from '../../shared/CardBox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn-ui/Default-Ui/dropdown-menu"
import BasicDropdownCode from './code/BasicDropdownCode'
import { Button } from '@/components/shadcn-ui/Default-Ui/button'
import DropdownWithRadioCode from './code/DropdownWithRadioCode'


const DropdownWithRadio = () => {
    const [position, setPosition] = React.useState("bottom")

    return (
        <CardBox>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Dropdown With Radio Group</h4>
                <DropdownWithRadioCode />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open Dropdown</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem  value="top">Top</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="bottom">Bottom</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="right">Right</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outlinesecondary">Open Dropdown</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem  value="top">Top</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="bottom">Bottom</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="right">Right</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outlinewarning">Open Dropdown</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem  value="top">Top</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="bottom">Bottom</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="right">Right</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outlineerror">Open Dropdown</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                            <DropdownMenuRadioItem  value="top">Top</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="bottom">Bottom</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem  value="right">Right</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardBox>
    )
}

export default DropdownWithRadio