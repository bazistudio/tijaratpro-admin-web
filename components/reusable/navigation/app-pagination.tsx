import React from 'react';
import { AppButton } from '../form/AppButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function AppPagination({ currentPage, totalPages, onPageChange, className }: AppPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between px-2 py-3", className)}>
      <div className="flex flex-1 justify-between sm:hidden">
        <AppButton
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </AppButton>
        <AppButton
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </AppButton>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">
            Page <span className="font-bold text-foreground">{currentPage}</span> of{' '}
            <span className="font-bold text-foreground">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex space-x-1 rounded-md shadow-sm" aria-label="Pagination">
            <AppButton
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-2 h-9 w-9 rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </AppButton>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) return null;
              }

              return (
                <AppButton
                  key={pageNum}
                  variant={currentPage === pageNum ? "primary" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(pageNum)}
                  className={cn(
                    "w-9 h-9 px-0 rounded-md", 
                    currentPage !== pageNum && "hover:bg-muted"
                  )}
                >
                  {pageNum}
                </AppButton>
              );
            })}

            <AppButton
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-2 h-9 w-9 rounded-md"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-4 w-4" />
            </AppButton>
          </nav>
        </div>
      </div>
    </div>
  );
}
