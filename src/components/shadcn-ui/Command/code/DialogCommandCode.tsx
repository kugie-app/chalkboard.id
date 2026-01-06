import React from 'react'
import CodeModal from '../../CodeModal'

const DialogCommandCode = () => {
  return (
    <CodeModal>
        {
            `
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/shadcn-ui/Default-Ui/command";
import { DialogTitle } from "@/components/shadcn-ui/Default-Ui/dialog";
 
 <Command className="rounded-lg border border-ld mt-4">
    <CommandInput
        className="border-none"
        placeholder="Type a command or search..."
    />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Settings">
        <CommandItem>
            <Smile />
            <span>Search Emoji</span>
        </CommandItem>
        <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
        </CommandItem>
        <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
        </CommandGroup>
    </CommandList>
    </Command>
    <CommandDialog open={open} onOpenChange={setOpen}>
    <DialogTitle className="sr-only">Command Dialog</DialogTitle>{" "}
    {/* Visually hidden */}
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
        <CommandItem>
            <Calendar />
            <span>Calendar</span>
        </CommandItem>
        <CommandItem>
            <Smile />
            <span>Search Emoji</span>
        </CommandItem>
        <CommandItem>
            <Calculator />
            <span>Calculator</span>
        </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
        <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
        </CommandGroup>
        </CommandList>
</CommandDialog>
            `
        }
    </CodeModal>
  )
}

export default DialogCommandCode