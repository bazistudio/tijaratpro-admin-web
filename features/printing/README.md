# Printing System Module

## Purpose
Manages remote printing requests from mobile and admin systems, serving as the digital-to-physical bridge for TijaratPro ERP.

## Workflow
Salesman creates order (Mobile) → Sends print request → Main shop PC receives request → Printer prints bill.

## Core Features
- **Print Queue**: Real-time management of pending and active print jobs.
- **Printer Selection**: Select available local or cloud-connected printers.
- **Retry System**: Critical support for retrying failed prints due to hardware issues.
- **Print Preview**: High-fidelity invoice rendering for verification before printing.
- **Status Tracking**: Visual feedback (Pending, Processing, Printed, Failed).

## Used By
- **Admin**: Dashboard monitor and command center.
- **Mobile**: Salesmen in the field triggering invoices.
- **Backend**: Job status synchronization.
- **Automation**: System-generated alerts and reports.

## Tech Stack
- **State**: Zustand (Printing Store)
- **Data Hook**: TanStack Query
- **Icons**: Lucide React
- **Styling**: Tailwind CSS 4
