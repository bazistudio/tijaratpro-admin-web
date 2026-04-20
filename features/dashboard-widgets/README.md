# Dashboard Widgets Module

## Purpose
Displays key business metrics and operational alerts on the dashboard to enable rapid decision-making for business owners and managers.

## Core Widgets
- **Revenue**: Today, Weekly, and Monthly financial snapshots.
- **Sales**: Gross sales volume and order counts.
- **Orders**: Management of the current order lifecycle and pending queue.
- **Stock Alerts**: Real-time inventory risk monitoring with critical highlighting.
- **Activity Feed**: Live chronological log of system-wide events.

## Data Source
Backend dashboard API (`/api/dashboard`).

## Performance Strategy
- **Standard Refresh**: Dashboard widgets automatically refresh every **30 seconds**.
- **Live Feed**: The Activity Feed uses a higher frequency refresh of every **15 seconds** to ensure near real-time operational awareness.
- **Optimized Loading**: Uses `WidgetCard` as a base to handle loading and skeleton states consistently.
- **Manual Refresh**: Global refresh control available in the Dashboard header.

## Used By
- **Admin**: System operators.
- **Business Owners**: Strategic performance tracking.
- **Managers**: Operational oversight.
