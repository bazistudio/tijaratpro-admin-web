# Multi-Dashboard System Architecture

## Overview
Enterprise-grade, role-aware dashboard engine designed for multi-tenant SaaS scalability. This module dynamically generates user interfaces based on RBAC permissions and organizational roles.

## System Layers

### 1. Registry & Resolver
- **Dashboard Registry**: Defines high-level dashboard types (`SUPER_ADMIN`, `SHOP_OWNER`, `STAFF`) and maps them to system roles.
- **Resolver**: Determines the entry-point dashboard layout based on the user's current role.

### 2. Config Engine
- **Dashboard Config**: Defines the specific layout rules (Grid/List) and the collection of widgets allowed for each dashboard type.

### 3. Widget Security
- **Widget Permission Filter**: Consumes the global RBAC system to perform granular visibility checks. Even if a widget is defined in a dashboard config, it will only render if the specific user has the required permission (e.g., `REPORTS.READ` for the Revenue Widget).

### 4. Layout Templates
- **SuperAdminLayout**: Global system health and cross-tenant analytics.
- **ShopOwnerLayout**: Deep-dive business metrics and operational alerts.
- **StaffLayout**: Execution-focused, simplified view for operators.

## Data Flow
`Login` → `RBAC Validation` → `Dashboard Resolver` → `Config Engine` → `Permission Filter` → `Final Composition Render`

## Usage
The dashboard is consumed via the `useDashboardResolver` hook, which provides the correct component and layout context automatically.

```tsx
const { DashboardComponent } = useDashboardResolver();

return <DashboardComponent />;
```

## Performance & Scaling
- **Lazy Widgets**: Individual widgets manage their own data cycles via TanStack Query.
- **Tenant Isolation**: Data fetching is automatically scoped to the active tenant/shop ID.
- **Optimized Polling**: Unified refresh strategy managed in `widget.constants.ts`.
