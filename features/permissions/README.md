# Permissions Module (RBAC)

## Overview
Enterprise-grade Role-Based Access Control (RBAC) system for TijaratPro ERP, providing granular security over modules and actions.

## RBAC Flow
`User` → `Role` → `Permissions List` → `AccessGuard` → `UI/API Access`

## Permission Format
The system uses a standardized, normalized permission string system:
**MODULE.ACTION**

Examples:
- `REPORTS.READ`: View report dashboards.
- `PRINTING.CREATE`: Trigger print commands.
- `MARKETING.UPDATE`: Edit salesman or visit data.
- `DASHBOARD.READ`: View global KPI widgets.

## Role Definitions
- **ADMIN**: Superuser with complete system override.
- **MANAGER**: Operational lead with broad management permissions.
- **SALESMAN**: Restricted field access for marketing and orders.
- **CASHIER**: Transaction-focused role with printing access.
- **VIEWER**: Read-only access for guest monitoring.

## Security Logic & AccessGuard
The `AccessGuard` component is the primary frontend enforcement layer. It supports three distinct security modes:
1. **HIDE (Default)**: Completely removes the UI from the DOM.
2. **DISABLE**: Renders the UI in a grayscale, non-interactive state with a "Restricted" tooltip.
3. **REDIRECT**: Replaces the content with a specialized "Access Restricted" landing view.

## Core Rules
1. **Normalized Strings**: Every permission MUST follow the `MODULE.ACTION` format to ensure compatibility with backend validation and future mobile/cybersecurity integration.
2. **Backend Enforcement**: Frontend RBAC is for user experience control. The backend MUST independently verify these same permission strings for every API request (implemented in future backend phases).
3. **Administrative Overrides**: Admins bypass all `hasPermission` checks via a centralized utility check.

## Usage Example
```tsx
import { AccessGuard } from "@/features/permissions";

<AccessGuard permission="REPORTS.READ" mode="REDIRECT">
  <SalesReportPage />
</AccessGuard>
```
