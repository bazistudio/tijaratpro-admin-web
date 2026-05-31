import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-[var(--bg-secondary)] text-[var(--text)] hover:bg-[var(--card-hover)]",
        destructive:
          "border-transparent bg-danger text-white shadow hover:bg-danger/80",
        success:
          "border-transparent bg-success text-white shadow hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-white shadow hover:bg-warning/80",
        info:
          "border-transparent bg-info text-white shadow hover:bg-info/80",
        outline: "text-[var(--text)] border-[var(--border)]",
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
