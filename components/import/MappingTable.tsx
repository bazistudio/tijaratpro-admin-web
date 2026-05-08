"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Layers } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ERP_SCHEMAS: Record<string, { field: string; label: string; required: boolean }[]> = {
  products: [
    { field: 'name', label: 'Product Name', required: true },
    { field: 'sku', label: 'SKU / Item Code', required: false },
    { field: 'purchasePrice', label: 'Purchase Price', required: false },
    { field: 'salePrice', label: 'Sale Price', required: true },
    { field: 'stock', label: 'Initial Stock', required: false },
    { field: 'category', label: 'Category', required: false },
  ],
  customers: [
    { field: 'name', label: 'Customer Name', required: true },
    { field: 'phone', label: 'Phone Number', required: true },
    { field: 'email', label: 'Email Address', required: false },
    { field: 'address', label: 'Address', required: false },
  ],
  orders: [
    { field: 'invoiceNumber', label: 'Invoice #', required: true },
    { field: 'date', label: 'Order Date', required: false },
    { field: 'productName', label: 'Product Name', required: true },
    { field: 'quantity', label: 'Quantity', required: true },
    { field: 'price', label: 'Sold Price', required: true },
  ]
}

interface MappingTableProps {
  headers: string[];
  importType: string;
  onBack: () => void;
  onComplete: (mapping: Record<string, string>) => void;
  isLoading: boolean;
}

export function MappingTable({ headers, importType, onBack, onComplete, isLoading }: MappingTableProps) {
  const schema = ERP_SCHEMAS[importType] || []
  const [mapping, setMapping] = useState<Record<string, string>>({})

  const handleMap = (erpField: string, excelHeader: string) => {
    setMapping(prev => ({ ...prev, [excelHeader]: erpField }))
  }

  const isComplete = schema.every(f => !f.required || Object.values(mapping).includes(f.field))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 p-3 rounded-xl">
          <Layers className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-heading">Column Mapping</h2>
          <p className="text-muted-foreground text-sm">Tell us which Excel columns correspond to TijaratPro fields.</p>
        </div>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">TijaratPro Field</th>
              <th className="text-left px-6 py-4 font-semibold">Your Excel Column</th>
              <th className="text-right px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {schema.map((field) => (
              <tr key={field.field} className="hover:bg-muted/20">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{field.label}</span>
                    {field.required && <span className="text-[10px] text-destructive font-bold uppercase">Required</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Select 
                    onValueChange={(val) => handleMap(field.field, val)}
                    value={Object.keys(mapping).find(key => mapping[key] === field.field) || ""}
                  >
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select Excel column..." />
                    </SelectTrigger>
                    <SelectContent>
                      {headers.map(h => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4 text-right">
                  {Object.values(mapping).includes(field.field) ? (
                    <span className="text-success font-medium">Mapped ✅</span>
                  ) : (
                    <span className="text-muted-foreground">Not mapped</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Upload
        </Button>
        <Button 
          disabled={!isComplete || isLoading} 
          onClick={() => onComplete(mapping)}
        >
          {isLoading ? "Analyzing Data..." : "Analyze & Preview"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
