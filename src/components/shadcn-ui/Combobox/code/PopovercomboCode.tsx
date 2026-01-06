import React from "react";
import CodeModal from "../../CodeModal";

const PopovercomboCode = () => {
  return (
    <CodeModal>
      {`
import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/Default-Ui/popover";
import CardBox from "../../shared/CardBox";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];
 
<Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button
        variant="outline"
        size="sm"
        className="w-full justify-start"
        >
        {selectedStatus ? (
            <>
            <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
            {selectedStatus.label}
            </>
        ) : (
            <>+ Set status</>
        )}
        </Button>
    </PopoverTrigger>
    <PopoverContent className="p-0" side="right" align="start">
        <Command>
        <CommandInput placeholder="Change status..." />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
            {statuses.map((status) => (
                <CommandItem
                key={status.value}
                value={status.value}
                onSelect={(value) => {
                    setSelectedStatus(
                    statuses.find(
                        (priority) => priority.value === value
                    ) || null
                    );
                    setOpen(false);
                }}
                >
                <status.icon
                    className={cn(
                    "mr-2 h-4 w-4",
                    status.value === selectedStatus?.value
                        ? "opacity-100"
                        : "opacity-40"
                    )}
                />
                <span>{status.label}</span>
                </CommandItem>
            ))}
            </CommandGroup>
        </CommandList>
        </Command>
    </PopoverContent>
</Popover>
            `}
    </CodeModal>
  );
};

export default PopovercomboCode;
