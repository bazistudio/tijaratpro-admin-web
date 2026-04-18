"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="max-w-md w-full hidden md:block">
          <Input 
            placeholder="Search across all modules..." 
            leftIcon={<Search />} 
            className="h-9 rounded-full bg-muted/50 border-transparent focus-visible:bg-transparent transition-all focus-within:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
        </Button>
        
        <div className="h-9 w-9 rounded-full bg-primary/20 border-2 border-primary overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-xs font-bold text-primary">AK</span>
        </div>
      </div>
    </header>
  )
}
