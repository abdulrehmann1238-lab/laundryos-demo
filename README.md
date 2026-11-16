# LaundryOS — The Operating System for Modern Laundromats

A premium, fully interactive, multi-tenant Laundry Management SaaS platform demo built for commercial and independent laundromat businesses.

[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status)](https://app.netlify.com)

---

## 🚀 Live Demo & Key Highlights

* **Multi-Tenant Architecture**: Supports isolated independent laundromats with separate datasets, orders, customer CRM, staff, pricing, and revenues:
  * **FreshFold Laundry** — Toronto, ON (CAD)
  * **PurePress Cleaners** — Vancouver, BC (CAD)
  * **The Laundry Studio** — Calgary, AB (CAD)
* **Connected User Journeys**:
  * **Customer Mobile App** (`/app`): 5-step interactive laundry booking wizard, custom detergent/wash preferences, time slot scheduling, estimated weight slider, Apple Pay/Credit Card simulated checkout, and vertical 8-stage live order tracking with a *"Simulate Next Update"* button.
  * **Business Management Hub** (`/dashboard`): Operational overview, searchable orders table with detail drawers and status controllers, customer CRM, dynamic pricing catalog, dispatch routing map, payment refunds, staff role management, and Recharts business analytics.
  * **Platform Administration** (`/platform`): Global console for LaundryOS SaaS owners tracking network MRR, active subscriptions, and multi-tenant fleet status.
  * **Technical Architecture & Backend Audit** (`/architecture`): Interactive NestJS + TypeScript + Prisma + PostgreSQL component tree and a 10-point technical audit checklist (*"Audit first. Rebuild only when justified"*).

---

## 🛠 Tech Stack

* **Framework**: React 18, TypeScript, Vite
* **Styling & System**: Tailwind CSS (Linen & Sage editorial palette)
* **Routing**: React Router DOM (v6)
* **Visualizations**: Recharts
* **Icons**: Lucide React
* **State Management**: Centralized React Context with persistent `localStorage` synchronization
* **Deployment Target**: Netlify with `netlify.toml` & SPA history-fallback rewrites

---

## 📦 Local Development

1. Clone repository:
   ```bash
   git clone https://github.com/abdulrehmann1238-lab/laundryos-demo.git
   cd laundryos-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build production bundle:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Netlify Deployment

This repository includes a pre-configured `netlify.toml` and `public/_redirects` file ready for 1-click import from GitHub into Netlify:

* **Build Command**: `npm run build`
* **Publish Directory**: `dist`
* **SPA Redirects**: Included (`/* -> /index.html 200`)
* **Security Headers**: X-Content-Type-Options, Referrer-Policy, and cache headers configured

---

## 📄 License

Proprietary prototype for LaundryOS demonstration.
