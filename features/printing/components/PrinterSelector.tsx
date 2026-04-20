import React from "react";
import { Printer } from "../types/printing.types";
import { usePrintingStore } from "../store/printing.store";
import { Printer as PrinterIcon, Check, ChevronDown, Circle } from "lucide-react";
import { clsx } from "clsx";

export const PrinterSelector: React.FC = () => {
  const { printers, selectedPrinter, setSelectedPrinter } = usePrintingStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative w-full max-w-[240px]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <PrinterIcon size={18} className="text-muted-foreground shrink-0" />
          <span className="text-sm font-semibold truncate">
            {selectedPrinter ? selectedPrinter.name : "Select Printer"}
          </span>
        </div>
        <ChevronDown size={16} className={clsx("text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-1.5 space-y-1">
            {printers.length > 0 ? (
              printers.map((printer) => (
                <button
                  key={printer.id}
                  onClick={() => {
                    setSelectedPrinter(printer);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    "w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors",
                    selectedPrinter?.id === printer.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Circle 
                      size={8} 
                      className={clsx(printer.isOnline ? "fill-green-500 text-green-500" : "fill-gray-400 text-gray-400")} 
                    />
                    <span>{printer.name}</span>
                    {printer.isDefault && (
                      <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase font-bold text-muted-foreground">Default</span>
                    )}
                  </div>
                  {selectedPrinter?.id === printer.id && <Check size={14} />}
                </button>
              ))
            ) : (
              <p className="p-4 text-center text-xs text-muted-foreground italic">No printers found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
