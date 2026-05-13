"use client";

import React from 'react';
import { Search, Bell, User as UserIcon, Menu, Plus, Settings, LogOut, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useUiStore } from "@/store";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function DashboardHeader() {
  const router = useRouter();
  const { toggleMobileNav } = useUiStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 transition-all duration-300">
      {/* Mobile Menu Toggle */}
      <div className="flex items-center lg:hidden mr-2">
        <Button variant="ghost" size="icon" onClick={toggleMobileNav}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            type="search"
            placeholder="Search shops, products, sales..."
            className="pl-9 h-9 w-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20 rounded-full"
          />
        </div>
      </div>
      
      {/* Mobile Search Icon placeholder */}
      <div className="flex md:hidden flex-1 justify-end mr-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/50 rounded-full">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        
        {/* Quick Add */}
        <Button variant="default" size="sm" className="hidden sm:flex items-center gap-1.5 h-9 rounded-full px-4 shadow-sm hover:shadow transition-all">
          <Plus className="h-4 w-4" />
          <span className="font-semibold text-xs tracking-wide">Quick Add</span>
        </Button>
        <Button variant="default" size="icon" className="sm:hidden h-8 w-8 rounded-full shadow-sm">
          <Plus className="h-4 w-4" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-background animate-pulse"></span>
        </Button>

        <div className="h-6 w-[1px] bg-border mx-1"></div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-1.5 hover:bg-muted rounded-full transition-all">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0 overflow-hidden shadow-sm">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=Admin&backgroundColor=0284c7,0ea5e9&textColor=ffffff`} alt="Avatar" className="h-full w-full object-cover" />
              </div>
              <div className="hidden sm:flex flex-col items-start text-xs text-left max-w-[100px]">
                <span className="font-semibold truncate w-full text-foreground">Admin User</span>
                <span className="text-muted-foreground uppercase text-[9px] font-bold tracking-wider truncate w-full">Super Admin</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-border/50 p-1">
            <DropdownMenuLabel className="font-bold px-2 py-1.5 text-xs text-muted-foreground uppercase tracking-wider">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors">
              <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors">
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/help')} className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors">
              <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Help Center</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-lg px-3 py-2 text-sm font-bold transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
