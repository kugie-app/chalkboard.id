import React from "react";
import CodeModal from "../../CodeModal";
const DropdownComboCode = () => {
  return (
    <CodeModal>
    {`
"use client";

import * as React from "react";
import { Calendar, MoreHorizontal, Tags, Trash, User } from "lucide-react";

import { Button } from "@/components/shadcn-ui/Default-Ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn-ui/Default-Ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/Default-Ui/dropdown-menu";
import CardBox from "../../shared/CardBox";

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

<Popover open={open} onOpenChange={setOpen} >
  <PopoverTrigger asChild>
      <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
      >
          {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
      </Button>
  </PopoverTrigger>
  <PopoverContent className=" p-0 ">
      <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                  {frameworks.map((framework) => (
                      <CommandItem
                      
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              setOpen(false)
                          }}
                      >
                          {framework.label}
                          <Check
                              className={cn(
                                  "ml-auto",
                                  value === framework.value ? "opacity-100" : "opacity-0"
                              )}
                          />
                      </CommandItem>
                  ))}
              </CommandGroup>
          </CommandList>
      </Command>
  </PopoverContent>
</Popover>
          `}
  </CodeModal>
  )
}

export default DropdownComboCode
