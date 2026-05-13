import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { AppInput, AppInputProps } from './AppInput';

export interface AppSearchBarProps extends Omit<AppInputProps, 'onChange'> {
  onSearch: (value: string) => void;
  debounceMs?: number;
}

export function AppSearchBar({ onSearch, debounceMs = 300, className, ...props }: AppSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(props.defaultValue?.toString() || props.value?.toString() || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onSearch]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
      <AppInput
        type="search"
        placeholder="Search..."
        className={`pl-9 ${className || ''}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        {...props}
      />
    </div>
  );
}
