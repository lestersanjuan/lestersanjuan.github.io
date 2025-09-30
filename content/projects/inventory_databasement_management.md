#Multi‑Business Order, Inventory, and Operations Platform

A production-grade SvelteKit application for multi-tenant order management, inventory control, warehouse operations reporting, and QuickBooks integration. I architected and implemented the end-to-end web app: authentication/session, API client, role-based access, multi-business context switching, order and shipment workflows, inventory controls, reporting, and a polished responsive UI.

## Highlights

- Multi-business context with admin-only company switching and global “All Companies” view
- Role-based access control (customer, manager, admin) enforced in UI and API usage
- Comprehensive domain coverage: orders, order products, products, shipments, inventory adjustments, businesses, locations, users, invites
- Robust API client with auth, error normalization, pagination, and presigned uploads
- Warehouse operations reporting with CSV export and cross-entity aggregation
- UX-first Svelte UI with Tailwind, headless components, toast notifications, and responsive tables
- Environment-aware API proxy for local dev and Node adapter for deploys
- Token-based session via cookies with optional CryptoJS encryption

---

## Tech Stack

- Framework: SvelteKit (`@sveltejs/kit`), Svelte 3, Adapter Node
- Styling/UI: Tailwind CSS, Headless UI for Svelte, Heroicons, Inter font
- State: Svelte stores (cart, business context)
- HTTP: Axios
- Utilities: CryptoJS, universal-cookie, moment, svelte-toasts, html2pdf.js (typings)
- Tooling: TypeScript, ESLint, Prettier, PostCSS

---

## Architecture

- SvelteKit server hooks and session:
  - `src/hooks.ts` loads authenticated user from `access_token` cookie and enriches admin users with businesses. Uses backend API directly (server URL) and tolerates transient failures.
- API proxy for dev:
  - `src/routes/api/[...path].ts` forwards GET/POST/PATCH/DELETE to backend. Passes `Authorization`, `X-Business-Id`, `Content-Type`.
- API client:
  - `src/utils/api.ts` centralizes backend calls with two axios instances (`pub`, `auth`), bearer injection, business context header injection (`X-Business-Id`), and rich error normalization. Covers:
    - Auth and users (me, CRUD, password updates)
    - Orders, order-products (create/update/delete/summary), search with unified endpoint and pagination
    - Products (CRUD), presigned image upload flow (MinIO/S3)
    - Shipments (CRUD, items enrichment with product lookup)
    - Inventory adjustments, pallet adjustments
    - Businesses (CRUD) and image upload flow
    - Locations (CRUD) and user–location assignment
    - Invites (CRUD + token flows)
    - QuickBooks credentials, authorize URL, and order sync endpoints
    - Search utilities: orders and shipments with filtering and pagination
- Role-based access:
  - `src/utils/access-control.ts` defines role hierarchy and guards. Includes a Svelte `roleGuard` action for conditional rendering.
- Multi-business context:
  - `src/stores/business.ts` provides `currentBusiness`, `availableBusinesses`, `canSwitchBusiness`, and `businessActions` (initialize, switch, clear). Persists selection in `localStorage`.
  - `src/lib/uishell/BusinessSelector.svelte` loads businesses, injects “All Companies” (-1) for admins, and renders a dropdown with selection.
  - Request header `X-Business-Id` is automatically attached by `api.ts` for scoped operations.
- Auth/session cookies:
  - `src/utils/cookie.ts` wraps `universal-cookie`. Supports encrypted tokens via `src/utils/crypto.ts` (currently toggled off for dev). Lax cookies for OAuth flows, durable 7‑day expiry.
- Styling/config:
  - Tailwind config with InterVariable font, primary/neutral palettes, typography and forms plugins.

---

## Features

### 1) Authentication and Session

- Login/register and “me” endpoints
- Cookie-based token management with optional AES encryption (CryptoJS)
- SSR session via `getSession` in `src/hooks.ts`, including admin enrichment with mock businesses fallback

### 2) Role-Based Access Control

- Roles: `customer`, `manager`, `admin`
- Guarded navigation and pages (e.g., Inventory/Shipments/Adjustments require manager+; Company admin-only; Settings adaptable)
- `AccessControl` helpers and `roleGuard` action for declarative UI gating

### 3) Multi-Business Context Switching

- Admins can switch businesses from a global header using `BusinessSelector`
- “All Companies” (-1) mode enables cross-company browsing and reporting, with write actions disabled where applicable
- Requests propagate `X-Business-Id` automatically; UI disables actions until a specific company is selected

### 4) Orders Workflow

- Cart-driven order creation (`/dashboard/orders/new`):
  - Cart saved to localStorage with a “single-company” invariant (prevents mixing inventory across companies)
  - User location selection sourced by role: admins use selected business’ locations; non-admins use assigned locations
  - Validations for name, location, business selection, and cart consistency
  - Submit creates order then individual order-products
- Orders search and listing via unified `v1/orders/search` with pagination and filters (status, date range, SKU, location, totals, user, business, etc.)
- Status transitions: processing, confirmed, invoiced, cancelled
- Cost computation endpoint for orders

### 5) Catalog and Cart

- Catalog (`$lib/catalog`, used across dashboard) with search, SKU/name filter, sorting (SKU/price/stock)
- Cart store enforces single-business rule; supports quantity changes, item removal, and full clear with toasts
- `OrderTable.svelte` renders responsive cart line-items with editing, per-row confirmation for deletes, and totals

### 6) Products

- CRUD endpoints with JSON and multipart flows
- Presigned upload flow to S3/MinIO and URL patching
- Display list supports image or initials fallback, last-30/60/90 derived fields, stock and min-qty columns

### 7) Inventory Management

- Inventory listing with admin “All Companies” view disabled for create actions until a specific company is selected
- Low-stock notifications:
  - Header bell icon fetches products and highlights items where `stock <= minimum_quantity`
  - Inline modal presents actionable list and links to Inventory

### 8) Shipments

- Shipments list/search, create, update, delete
- Shipment items enriched client-side with product details; resilient to missing products

### 9) Inventory Adjustments

- History feed and creation endpoint
- Pallet adjustments per business with positive/negative deltas and notes

### 10) Locations and User Access

- Business locations CRUD
- Assign/remove locations to users; bulk replace for multiple assignments
- Settings page allows admins to manage their own business and location context

### 11) Businesses and Branding

- Business CRUD and image upload flow (presign + PUT + PATCH)
- Header shows selected business name and logo across the app

### 12) Invites

- Full invite lifecycle: create, read, update, delete, accept/reject
- Token-based flows for self-serve onboarding

### 13) QuickBooks Integration

- Store/retrieve QuickBooks credentials per business
- Retrieve authorize URL for OAuth handshake
- Order sync job per order with action modes: create, update, delete

### 14) Reporting and Analytics

- Warehouse operations report (dashboard and reports pages):
  - Date-range inputs (defaults to current month)
  - Aggregates orders, shipments, and inventory adjustments
  - Per-business KPI breakdown: orders, will-call vs delivery, product quantities, pallet movements (timeline), and net pallets
  - CSV export with overall and per-company sections
- Reports gated to manager+ via `AccessControl`

---

## Developer Experience

- Commands:
  - `npm run dev` – local dev server
  - `npm run build` – production build (Adapter Node)
  - `npm run preview` – preview production build
  - `npm run check` – typechecking
  - `npm run lint` / `npm run format` – code quality and formatting
- PostCSS/Tailwind pipeline and typography/forms plugins
- Prettier with Tailwind plugin for class ordering

---

## My Contributions

- Architected SvelteKit app structure and SSR session with secure cookie handling
- Implemented robust API client with auth, business header propagation, error normalization, and comprehensive domain methods
- Built multi-business context model with admin selector and “All Companies” semantics
- Developed orders flow: cart persistence, location sourcing by role, creation pipeline, validations
- Implemented inventory UI, low-stock alerts, and shipment flows with resilient enrichment
- Built inventory adjustment flows including pallet tracking and business-level adjustments
- Implemented invites lifecycle and user–location management tools
- Integrated QuickBooks credential storage, auth initiation, and order sync triggers
- Created warehouse reporting with cross-entity aggregation and CSV export
- Designed responsive UI with Tailwind, headless components, icons, and toast feedback
- Set up dev proxy route and Node adapter for deployment

---

## Security and Resilience

- Token persisted with optional AES encryption (configurable; disabled in dev)
- Defensive error normalization and tolerant session handling
- Enforced single-company cart invariant to prevent cross-tenant errors
- Role-based gating across navigation and pages

---

## Screens and Flows

- Dashboard with “Generate Reports” and “Create New Order”
- Catalog and responsive cart table
- Inventory (list, create), Shipments, Adjustments
- Orders: new, list, status-specific filters
- Reports: warehouse operations (CSV export)
- Company admin: business switcher, branding
- Settings: profile, password, business selection (admin), locations management
- Auth: login/register, invite acceptance flows

---

## Deployment

- Built with `@sveltejs/adapter-node` for Node hosting
- Tailwind JIT and content scanning configured for performance
- API base URLs driven by environment variables; dev proxy via SvelteKit route
