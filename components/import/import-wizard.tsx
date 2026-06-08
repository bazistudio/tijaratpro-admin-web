"use client"

import * as React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Upload, ArrowRight, FileSpreadsheet, Layers, ShieldCheck } from "lucide-react"
import { FileUploader } from "./file-uploader"
import { MappingTable } from "./mapping-table"
import { ValidationPreview } from "./validation-preview"
import { toast } from "sonner"
import { importService } from "@/services/import.service"

const STEPS = [
  { id: 'upload', title: 'Upload File', icon: Upload },
  { id: 'map', title: 'Map Columns', icon: Layers },
  { id: 'preview', title: 'Preview & Validate', icon: ShieldCheck },
]

export function ImportWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [importType, setImportType] = useState('products')
  const [excelHeaders, setExcelHeaders] = useState<string[]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [previewData, setPreviewData] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileAccepted = (file: File, headers: string[]) => {
    setFile(file)
    setExcelHeaders(headers)
    setCurrentStep(1)
  }

  const handleMappingComplete = async (finalMapping: Record<string, string>) => {
    setMapping(finalMapping)
    setIsProcessing(true)
    try {
      const data = await importService.preview(file!, importType, finalMapping)
      setPreviewData(data)
      setCurrentStep(2)
    } catch (error: any) {
      toast.error(error.message || "Failed to parse file")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConfirmImport = async () => {
    setIsProcessing(true)
    try {
      await importService.confirm(previewData.preview, importType, previewData.sessionId)
      toast.success("Import completed successfully!")
      // Redirect or Reset
      window.location.href = `/${importType}`
    } catch (error: any) {
      toast.error(error.message || "Import failed")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {STEPS.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all ${
                idx <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'
              }`}>
                {idx < currentStep ? <Check className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
              </div>
              <span className={`text-sm font-medium ${idx <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.title}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-[2px] flex-1 mx-4 ${idx < currentStep ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <Card className="glass-card p-8 min-h-[400px] flex flex-col">
        {currentStep === 0 && (
          <FileUploader 
            onFileAccepted={handleFileAccepted} 
            importType={importType} 
            setImportType={setImportType} 
          />
        )}

        {currentStep === 1 && (
          <MappingTable 
            headers={excelHeaders} 
            importType={importType} 
            onBack={() => setCurrentStep(0)}
            onComplete={handleMappingComplete}
            isLoading={isProcessing}
          />
        )}

        {currentStep === 2 && (
          <ValidationPreview 
            data={previewData} 
            onBack={() => setCurrentStep(1)}
            onConfirm={handleConfirmImport}
            isLoading={isProcessing}
          />
        )}
      </Card>
    </div>
  )
}
