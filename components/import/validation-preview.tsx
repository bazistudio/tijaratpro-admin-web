"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ValidationPreviewProps {
  data: {
    preview: any[];
    totalCount: number;
    validCount: number;
    errorCount: number;
    errors: any[];
  };
  onBack: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function ValidationPreview({ data, onBack, onConfirm, isLoading }: ValidationPreviewProps) {
  const healthScore = Math.round((data.validCount / data.totalCount) * 100)

  return (
    <div className="space-y-8">
      {/* Health Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col items-center text-center space-y-2 border-primary/20 bg-primary/5">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Import Health Score</span>
          <span className={`text-5xl font-bold font-heading ${healthScore > 90 ? 'text-success' : healthScore > 70 ? 'text-warning' : 'text-destructive'}`}>
            {healthScore}%
          </span>
          <p className="text-xs text-muted-foreground">Overall data quality match</p>
        </Card>

        <Card className="p-6 flex flex-col justify-center space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-success" /> Valid Rows
            </div>
            <span className="font-bold">{data.validCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="h-4 w-4 text-warning" /> Rows with Warnings
            </div>
            <span className="font-bold">0</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <XCircle className="h-4 w-4 text-destructive" /> Rejected Rows
            </div>
            <span className="font-bold">{data.errorCount}</span>
          </div>
        </Card>

        <div className="bg-muted/30 rounded-2xl p-6 flex flex-col justify-center">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold">Migration Insight</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We've analyzed your data. Rejected rows are usually due to missing required fields or incorrect data types.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-heading">Data Preview (First 10 Rows)</h3>
        <div className="border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 border-b">
              <tr>
                {data.preview[0] && Object.keys(data.preview[0]).map(key => (
                  <th key={key} className="text-left px-4 py-3 font-semibold uppercase">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.preview.map((row, i) => (
                <tr key={i} className="hover:bg-muted/10">
                  {Object.values(row).map((val: any, j) => (
                    <td key={j} className="px-4 py-3 whitespace-nowrap">{val?.toString() || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mapping
        </Button>
        <Button 
          size="lg"
          className="px-8"
          disabled={data.validCount === 0 || isLoading} 
          onClick={onConfirm}
        >
          {isLoading ? "Importing..." : `Finalize Import (${data.validCount} Rows)`}
        </Button>
      </div>
    </div>
  )
}
