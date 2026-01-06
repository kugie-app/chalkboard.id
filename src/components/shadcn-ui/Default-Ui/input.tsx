import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-ld focus:border-primary bg-transparent px-3 py-2  file:border-0  file:rounded-sm file:text-sm file:font-medium file:text-primary  file:bg-lightprimary  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-ld text-sm focus:ring-0",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
