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
import DropdownComboCode from "./code/DropdownComboCode";

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

const DropdownCombobox = () => {
  const [label, setLabel] = React.useState("feature");
  const [open, setOpen] = React.useState(false);

  return (
    <CardBox>
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold">Dropdown Combobox</h4>
        <DropdownComboCode/>
      </div>
      <div className="flex w-full flex-col items-start justify-between rounded-md border border-ld px-2 mt-4 sm:flex-row sm:items-center">
        <p className="text-sm font-medium leading-none">
          <span className="mr-2 rounded-lg bg-primary px-2 py-1 text-xs text-white">
            {label}
          </span>

        </p>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Assign to...
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar />
                Set due date...
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tags />
                  Apply label
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Filter label..."
                      autoFocus={true}
                    />
                    <CommandList>
                      <CommandEmpty>No label found.</CommandEmpty>
                      <CommandGroup>
                        {labels.map((label) => (
                          <CommandItem
                            key={label}
                            value={label}
                            onSelect={(value) => {
                              setLabel(value);
                              setOpen(false);
                            }}
                          >
                            {label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error">
                <Trash />
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardBox>
  );
};

export default DropdownCombobox;
