import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent text-white bg-primary  hover:bg-lightprimary hover:text-primary",
          primary:
          "border-transparent text-white bg-primary  hover:bg-lightprimary hover:text-primary",
        secondary:
          "border-transparent bg-secondary text-white hover:bg-lightsecondary hover:text-secondary",
        success:
          "border-transparent bg-success text-white hover:bg-lightsuccess hover:text-success",
        warning:
          "border-transparent bg-warning text-white hover:bg-lightwarning hover:text-warning",
        info:
          "border-transparent bg-info text-white hover:bg-lightinfo hover:text-info",
        error:
          "border-transparent bg-error text-white hover:bg-lighterror hover:text-error",
        outline: "border-primary text-primary hover:bg-primary hover:text-white",
        outlineSecondary: "border-secondary text-secondary hover:bg-secondary hover:text-white", 
        outlineSuccess: "border-success text-success hover:bg-success hover:text-white", 
        outlineWarning: "border-warning text-warning hover:bg-warning hover:text-white", 
        outlineError: "border-error text-error hover:bg-error hover:text-white", 
        outlineInfo: "border-info text-info hover:bg-info hover:text-white", 
        lightPrimary: "bg-lightprimary text-primary hover:bg-primary hover:text-white",
        lightSecondary: "bg-lightsecondary text-secondary hover:bg-secondary hover:text-white",
        lightSuccess: "bg-lightsuccess text-success hover:bg-success hover:text-white",
        lightError: "bg-lighterror text-error hover:bg-error hover:text-white",
        lightInfo: "bg-lightinfo text-info hover:bg-info hover:text-white",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
