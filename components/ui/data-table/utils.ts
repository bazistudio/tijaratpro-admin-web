/**
 * DataTable Utilities
 * 
 * Placeholder for table helper functions like custom formatters,
 * logic for column concatenation, or data transformations.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
