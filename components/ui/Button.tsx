import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/30 hover:-translate-y-0.5",
        secondary:
          "bg-[var(--bg-secondary)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--card-hover)] hover:border-primary/30",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--bg-secondary)] hover:border-primary/50",
        ghost: "hover:bg-[var(--bg-secondary)] text-[var(--text)]",
        link: "text-primary underline-offset-4 hover:underline",
        danger: "bg-danger text-white shadow-lg shadow-danger/20 hover:bg-danger/90 hover:-translate-y-0.5",
      },
      size: {
        default: "h-14 px-8 py-2",
        sm: "h-10 rounded-xl px-4 text-xs",
        lg: "h-16 rounded-[20px] px-10 text-lg",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
