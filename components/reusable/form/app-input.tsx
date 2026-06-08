import React from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface AppInputProps extends InputProps {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ label, error, hint, containerClassName, className, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className={cn("space-y-2 w-full flex flex-col", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className={cn(error && "text-destructive", "font-medium text-sm")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Input
          id={inputId}
          ref={ref}
          required={required}
          className={cn(error && "border-destructive focus-visible:ring-destructive/20", className)}
          {...props}
        />
        {error && <p className="text-xs text-destructive font-medium">{error}</p>}
        {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";
