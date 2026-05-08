"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react"
import * as XLSX from "xlsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FileUploaderProps {
  onFileAccepted: (file: File, headers: string[]) => void;
  importType: string;
  setImportType: (type: string) => void;
}

export function FileUploader({ onFileAccepted, importType, setImportType }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const processFile = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      const headers = json[0] as string[]
      onFileAccepted(file, headers)
    }
    reader.readAsArrayBuffer(file)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      processFile(file)
    }
  }, [])

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">What are you importing today?</Label>
          <Select value={importType} onValueChange={setImportType}>
            <SelectTrigger className="h-14 text-lg">
              <SelectValue placeholder="Select module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="products">Products Inventory</SelectItem>
              <SelectItem value="customers">Customer Database</SelectItem>
              <SelectItem value="orders">Sales History</SelectItem>
              <SelectItem value="expenses">Business Expenses</SelectItem>
            </SelectContent>
          </Select>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex gap-3 text-sm text-muted-foreground">
            <AlertCircle className="h-5 w-5 text-primary shrink-0" />
            <p>Ensure your file is in .xlsx or .csv format. You can map your custom columns in the next step.</p>
          </div>
        </div>

        <div 
          className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 transition-all cursor-pointer ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            accept=".xlsx, .xls, .csv" 
            onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
          />
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold font-heading">Drop your file here</h3>
          <p className="text-muted-foreground mt-1">or click to browse from computer</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <FileSpreadsheet className="h-4 w-4" /> Supporting XLSX, CSV, and XLS
          </div>
        </div>
      </div>
    </div>
  )
}
