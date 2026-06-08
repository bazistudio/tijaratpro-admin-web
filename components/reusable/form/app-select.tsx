import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface AppSelectProps {
  label?: string;
  error?: string;
  hint?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  containerClassName?: string;
  triggerClassName?: string;
}

export function AppSelect({
  label,
  error,
  hint,
  options,
  placeholder = "Select an option",
  value,
  defaultValue,
  onValueChange,
  disabled,
  required,
  containerClassName,
  triggerClassName,
}: AppSelectProps) {
  const id = React.useId();

  return (
    <div className={cn("space-y-2 w-full flex flex-col", containerClassName)}>
      {label && (
        <Label htmlFor={id} className={cn(error && "text-destructive", "font-medium text-sm")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger 
          id={id}
          className={cn(error && "border-destructive focus:ring-destructive/20", triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
