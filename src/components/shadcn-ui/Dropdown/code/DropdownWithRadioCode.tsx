import React from 'react'
import CodeModal from '../../CodeModal'

const DropdownWithRadioCode = () => {
  return (
    <CodeModal>
        {
            `
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn-ui/Default-Ui/dropdown-menu"\
import { Button } from '@/components/shadcn-ui/Default-Ui/button'

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
            `
        }
    </CodeModal>
  )
}

export default DropdownWithRadioCode