import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full group">
        {label && (
          <label className="text-xs font-black uppercase tracking-widest text-[var(--text-soft)] ml-1">
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-4 text-[var(--text-soft)] flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 group-focus-within:text-primary transition-colors">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/50 px-5 py-3 text-base text-[var(--text)] transition-all",
              "placeholder:text-[var(--text-soft)]/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-12",
              rightIcon && "pr-12",
              error && "border-danger focus:ring-danger/20 focus:border-danger",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 text-[var(--text-soft)] flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-[0.7rem] font-bold text-danger ml-1 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-danger" />
            {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
