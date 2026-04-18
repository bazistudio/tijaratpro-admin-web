"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface SearchableSelectProps {
  options: { label: string; value: string }[]
  value?: string | string[]
  onChange: (value: string | string[]) => void
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  multi?: boolean
}

export function SearchableSelect({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  multi = false,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedValues = React.useMemo(() => {
    if (multi) return Array.isArray(value) ? value : []
    return value ? [value as string] : []
  }, [value, multi])

  const handleSelect = (currentValue: string) => {
    if (multi) {
      const isSelected = selectedValues.includes(currentValue)
      const newValues = isSelected
        ? selectedValues.filter((v) => v !== currentValue)
        : [...selectedValues, currentValue]
      onChange(newValues)
    } else {
      onChange(currentValue === value ? "" : currentValue)
      setOpen(false)
    }
  }

  const displayLabel = React.useMemo(() => {
    if (selectedValues.length === 0) return placeholder
    if (multi) {
      if (selectedValues.length === 1) {
        return options.find((opt) => opt.value === selectedValues[0])?.label
      }
      return `${selectedValues.length} selected`
    }
    return options.find((opt) => opt.value === value)?.label || placeholder
  }, [selectedValues, options, multi, value, placeholder])

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            <span className="truncate">{displayLabel}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[200px] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
