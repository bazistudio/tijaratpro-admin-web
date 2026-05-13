"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Search, 
  Command, 
  Package, 
  User, 
  CreditCard, 
  Layout, 
  TrendingUp, 
  Settings,
  History,
  Zap,
  Tag,
  ArrowRight
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useOmnisearch, GLOBAL_NAV_RESULTS } from "@/hooks/use-omnisearch"
import { Badge } from "@/components/ui/badge"

export function Omnisearch() {
  const router = useRouter()
  const { isOpen, setOpen } = useOmnisearch()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!isOpen)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, setOpen])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [setOpen])

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput placeholder="Search anything in TijaratPro (Ctrl+K)..." className="h-16 border-none focus:ring-0 text-lg" />
      <CommandList className="max-h-[450px] overflow-y-auto scrollbar-hide pb-4">
        <CommandEmpty className="py-12 text-center">
           <div className="flex flex-col items-center gap-4 text-[var(--text-soft)]">
              <div className="p-4 rounded-full bg-slate-50">
                 <Search size={32} />
              </div>
              <p className="font-bold text-sm">No results found for this search.</p>
           </div>
        </CommandEmpty>
        
        {/* Quick Actions Group */}
        <CommandGroup heading="Quick Actions">
          {GLOBAL_NAV_RESULTS.map((item) => (
            <CommandItem
              key={item.id}
              value={item.title}
              onSelect={() => runCommand(() => router.push(item.url))}
              className="flex items-center gap-4 p-3 cursor-pointer group"
            >
              <div className="p-2 rounded-xl bg-primary/10 text-primary group-aria-selected:bg-primary group-aria-selected:text-white transition-all">
                 <Zap size={18} />
              </div>
              <div className="flex-1">
                 <p className="font-bold text-sm">{item.title}</p>
                 <p className="text-[10px] text-[var(--text-soft)] uppercase tracking-widest font-black">Quick Navigation</p>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-aria-selected:text-primary group-aria-selected:translate-x-1 transition-all" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-[var(--border)]/50 mx-4" />

        {/* Dynamic Search Simulations */}
        <CommandGroup heading="Recent Records">
           <CommandItem onSelect={() => runCommand(() => router.push("/products"))} className="p-3 gap-4 group">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-500 group-aria-selected:bg-primary/20 group-aria-selected:text-primary">
                 <Package size={18} />
              </div>
              <div className="flex-1">
                 <p className="font-bold text-sm">iPhone 13 Pro Max - Display</p>
                 <p className="text-[10px] text-[var(--text-soft)] uppercase tracking-widest font-black">Product Code: #8841</p>
              </div>
              <Badge variant="outline" className="text-[9px] font-black uppercase border-slate-200">Stock: 12</Badge>
           </CommandItem>
           <CommandItem onSelect={() => runCommand(() => router.push("/sales"))} className="p-3 gap-4 group">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-500 group-aria-selected:bg-primary/20 group-aria-selected:text-primary">
                 <CreditCard size={18} />
              </div>
              <div className="flex-1">
                 <p className="font-bold text-sm">Invoice INV-9924-X</p>
                 <p className="text-[10px] text-[var(--text-soft)] uppercase tracking-widest font-black">Customer: Walk-in</p>
              </div>
              <Badge className="bg-success/10 text-success text-[9px] uppercase font-black border-none">Rs 85,000</Badge>
           </CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-[var(--border)]/50 mx-4" />

        {/* Settings & System */}
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => router.push("/settings/appearance"))} className="p-3 gap-4 group">
             <div className="p-2 rounded-xl bg-slate-100 text-slate-500 group-aria-selected:bg-primary/20 group-aria-selected:text-primary">
                <Settings size={18} />
             </div>
             <span className="font-bold text-sm flex-1">Theme Customization</span>
             <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/activity"))} className="p-3 gap-4 group">
             <div className="p-2 rounded-xl bg-slate-100 text-slate-500 group-aria-selected:bg-primary/20 group-aria-selected:text-primary">
                <History size={18} />
             </div>
             <span className="font-bold text-sm flex-1">Audit Logs</span>
             <CommandShortcut>⌘L</CommandShortcut>
          </CommandItem>
        </CommandGroup>

      </CommandList>
      
      {/* Footer Branding */}
      <div className="p-4 border-t border-[var(--border)] bg-slate-50/50 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <Layout size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">TijaratPro Intelligence</span>
         </div>
         <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
            <div className="flex items-center gap-1">
               <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">↑↓</kbd> Navigate
            </div>
            <div className="flex items-center gap-1">
               <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">↵</kbd> Select
            </div>
            <div className="flex items-center gap-1">
               <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white">esc</kbd> Close
            </div>
         </div>
      </div>
    </CommandDialog>
  )
}
