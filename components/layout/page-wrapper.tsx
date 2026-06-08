import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  actions?: React.ReactNode
}

export function PageWrapper({ children, className, title, description, actions }: PageWrapperProps) {
  return (
    <main className={cn("flex-1 overflow-x-hidden overflow-y-auto bg-muted/30 p-6 md:p-8", className)}>
      <div className="mx-auto max-w-7xl space-y-6">
        
        {(title || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              {title && <h1 className="text-2xl font-bold font-heading text-foreground">{title}</h1>}
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}

        {children}
      </div>
    </main>
  )
}
