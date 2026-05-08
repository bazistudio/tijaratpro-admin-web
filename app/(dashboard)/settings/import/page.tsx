"use client"

import * as React from "react"
import { PageLayout } from "@/components/layout/PageLayout"
import { ImportWizard } from "@/components/import/ImportWizard"

export default function ImportPage() {
  return (
    <PageLayout 
      title="Data Migration Center" 
      breadcrumbs={<span className="flex items-center gap-2">Settings <span className="text-muted-foreground/50">/</span> Import</span>}
    >
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading">Migrate Your Business</h1>
          <p className="text-muted-foreground mt-2">
            Seamlessly import your products, customers, and sales history from legacy software using Excel or CSV files.
          </p>
        </div>

        <ImportWizard />
      </div>
    </PageLayout>
  )
}
