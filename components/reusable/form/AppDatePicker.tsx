"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface AppDatePickerProps {
  date?: Date
  setDate: (date?: Date) => void
  label?: string
  placeholder?: string
  className?: string
  error?: string
  hint?: string
  required?: boolean
  containerClassName?: string
}

export function AppDatePicker({ 
  date, 
  setDate, 
  label, 
  placeholder = "Pick a date", 
  className,
  error,
  hint,
  required,
  containerClassName
}: AppDatePickerProps) {
  const id = React.useId();

  return (
    <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
      {label && (
        <Label htmlFor={id} className={cn(error && "text-destructive", "font-medium text-sm")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-destructive focus:ring-destructive/20",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
