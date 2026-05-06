"use client"

import * as React from "react"
import { Plus, Printer, Save, Trash2, KeySquare, ScanLine } from "lucide-react"

import { PageWrapper } from "@/components/layout/PageWrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { SearchableSelect } from "@/components/custom/forms/SearchableSelect"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewSalePOS() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // Mock State for the table
  const [items, setItems] = React.useState([
    { id: 1, itemCode: "ITM-001", desc: "Wholesale Fabric Roll", qty: 2, rate: 1500, discount: 0, tax: 0 },
  ])

  // Mock calculation
  const grossTotal = items.reduce((acc, curr) => acc + (curr.qty * curr.rate), 0)
  const [flatDiscount, setFlatDiscount] = React.useState(0)
  const [cashPaid, setCashPaid] = React.useState(0)
  const netTotal = grossTotal - flatDiscount
  const balance = netTotal - cashPaid

  return (
    <PageWrapper className="p-2 md:p-4 bg-background h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex flex-col h-full gap-4 max-w-full">
        
        {/* TOP: Header & Information Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 shrink-0">
          <Card className="lg:col-span-8 p-4 py-3 bg-muted/20 border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Invoice No.</label>
                <div className="h-9 px-3 py-1 flex items-center bg-muted/50 rounded-md border text-sm font-medium">INV-26001</div>
              </div>
              <DatePicker date={date} setDate={setDate} label="Date" className="[&>div>button]:h-9" />
              <SearchableSelect 
                label="Party / Customer" 
                options={[{ label: "Walk-in Customer", value: "walkin" }, { label: "Kamran Malik", value: "kamran" }]}
                value="walkin"
                onChange={() => {}}
              />
              <SearchableSelect 
                label="Sale Type" 
                options={[{ label: "Cash Sale", value: "cash" }, { label: "Credit Sale", value: "credit" }]}
                value="cash"
                onChange={() => {}}
              />
            </div>
            
            <div className="flex items-center gap-6 mt-4 text-xs font-medium text-muted-foreground w-full flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer"><Checkbox /> Auto Print</label>
              <label className="flex items-center gap-2 cursor-pointer"><Checkbox /> Enter Search Enable</label>
              <label className="flex items-center gap-2 cursor-pointer"><Checkbox /> Show Selling Price</label>
            </div>
          </Card>

          <Card className="lg:col-span-4 bg-muted/20 border-border flex flex-col justify-center items-center text-center p-4">
            <h3 className="text-lg font-bold text-muted-foreground font-heading">GRAND TOTAL</h3>
            <div className="text-4xl font-black text-primary tracking-tight mt-1">Rs {netTotal.toLocaleString()}</div>
          </Card>
        </div>

        {/* MIDDLE: Product Grid (Scales to fill remaining height) */}
        <Card className="flex-1 overflow-hidden flex flex-col border-border rounded-lg p-0">
          <div className="bg-muted px-4 py-2 flex items-center gap-4 shrink-0 border-b">
            <div className="flex-1 max-w-sm relative">
              <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Scan Barcode or Type Code..." 
                className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/40 sticky top-0 border-b z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold">Code</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold w-24">Qty</th>
                  <th className="px-4 py-3 font-semibold w-32">Rate</th>
                  <th className="px-4 py-3 font-semibold w-24">Dis%</th>
                  <th className="px-4 py-3 font-semibold text-right">Amount</th>
                  <th className="px-4 py-3 w-12 text-center">Act</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-medium">{row.itemCode}</td>
                    <td className="px-4 py-2">{row.desc}</td>
                    <td className="px-4 py-2">
                      <input type="number" defaultValue={row.qty} className="w-full h-8 px-2 border rounded bg-background" />
                    </td>
                    <td className="px-4 py-2">
                      <input type="number" defaultValue={row.rate} className="w-full h-8 px-2 border rounded bg-background" />
                    </td>
                    <td className="px-4 py-2">
                      <input type="number" defaultValue={row.discount} className="w-full h-8 px-2 border rounded bg-background" />
                    </td>
                    <td className="px-4 py-2 text-right font-medium">
                      {((row.qty * row.rate) - row.discount).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* BOTTOM: Pricing, Discounts & Payment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 shrink-0">
          
          {/* Discounts */}
          <Card className="p-4 bg-muted/10 border-border">
            <h4 className="text-xs uppercase font-bold text-muted-foreground mb-3 font-heading">Discount Processing</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input label="% Discount" type="number" defaultValue={0} className="h-8" />
              <Input label="Flat Discount" type="number" value={flatDiscount} onChange={(e) => setFlatDiscount(Number(e.target.value))} className="h-8" />
              <Input label="Corporate Disc." type="number" defaultValue={0} className="h-8 text-muted-foreground" disabled />
            </div>
          </Card>

          {/* Payment Handling */}
          <Card className="p-4 bg-muted/10 border-border">
            <h4 className="text-xs uppercase font-bold text-muted-foreground mb-3 font-heading">Payment Collection</h4>
            <div className="grid grid-cols-2 gap-3">
              <SearchableSelect 
                label="Bank Account" 
                options={[{ label: "Cash at Office", value: "cash" }, { label: "Meezan Bank - 1002", value: "bank" }]}
                value="cash"
                onChange={() => {}}
              />
              <Input label="Cash / Paid Amount" type="number" value={cashPaid} onChange={(e) => setCashPaid(Number(e.target.value))} className="h-8 border-success focus-visible:ring-success" />
              <div className="col-span-2 flex justify-between items-center p-2 rounded-md bg-muted/30 border border-border/50">
                <span className="text-sm font-semibold text-muted-foreground">Remaining Balance</span>
                <span className={cn("font-bold", balance > 0 ? "text-warning" : "text-success")}>Rs {balance.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Action Footer */}
          <Card className="p-4 flex flex-col justify-end gap-3 border-border">
             <Button variant="premium" size="lg" className="w-full text-base font-bold tracking-wide shadow-glow-green" icon={<Save className="h-5 w-5" />}>
               Save & Authorize (F12)
             </Button>
             <div className="flex gap-3">
               <Button variant="outline" className="flex-1" icon={<Printer className="h-4 w-4" />}>Print (Ctrl+P)</Button>
               <Button variant="ghost" className="flex-1 text-destructive hover:bg-destructive/10" icon={<Trash2 className="h-4 w-4" />}>Cancel (Esc)</Button>
             </div>
          </Card>

        </div>
      </div>
    </PageWrapper>
  )
}
