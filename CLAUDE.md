# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Manufaktura Flowers** is a static e-commerce site for a premium floral studio in Constanța, Romania. It has no build system — all files are served directly as static HTML/CSS/JS. The backend is Supabase (PostgreSQL).

## Development

**No build, lint, or test tooling exists.** To develop locally, serve the files with any static server:

```bash
python -m http.server 8080
# or
npx serve .
```

**Database setup:** Run `supabase-setup.sql` in the Supabase SQL Editor to create and configure the `orders` table. The Supabase URL and anon key are hardcoded directly in `app.js`.

## Architecture

### File Structure

Every page is a self-contained HTML file with its own `<style>` block for page-specific layout. Shared logic and global styles live in two files:

- **`app.js`** — All shared JavaScript: product catalog, cart state, nav/footer rendering, Supabase client initialization, toast notifications, and scroll-reveal animations.
- **`shared.css`** — Global CSS variables, nav, footer, buttons, form elements, cart sidebar.

### Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page (hero, featured products, about) |
| `shop.html` | Product catalog with category filter and search |
| `product.html` | Product detail with image gallery; reads `?id=` from URL |
| `checkout.html` | Multi-step checkout: Delivery → Scheduling → Payment |
| `confirmation.html` | Order confirmation; reads last order from localStorage |
| `events.html` | Wedding/event services showcase |
| `orders.html` | Order tracking (public) + admin panel (password-gated) |

### Product Catalog

Products are hardcoded in `app.js` as the `PRODUCTS` array — there is no CMS or API for products. Each product has: `id` (kebab-case), `name`, `category`, `price` (integer RON), `img` (Pexels URL), `desc`, and `badge`.

Categories: `romantic`, `nunta`, `cadou`, `aranjament`, `sezonier`.

### Cart & State

Cart state is persisted in `localStorage` under the key `mf3_cart` as a JSON array of `{id, name, price, img, qty}`. The last placed order is stored under `mf3_last_order`. All localStorage keys are prefixed `mf3_`.

### Supabase Integration

The Supabase client is lazy-loaded via ESM CDN (`esm.sh`) inside `initSupabase()` in `app.js`. It is called on-demand by checkout and order tracking pages. The `orders` table schema:

```
id, created_at, name, phone, email, address, message,
delivery_date, delivery_time, payment_method, items (JSON string), total (int), status (enum)
```

Status enum values (Romanian): `nouă`, `confirmată`, `pregătire`, `livrare`, `livrată`.

RLS policies allow public insert and select — no authentication is required.

## CSS Conventions

**CSS variables** defined in `shared.css` use short single-letter names:

| Variable | Meaning |
|---|---|
| `--c` | Cream (background) |
| `--r` | Rose/pink (accent) |
| `--d` | Dark (text/headings) |
| `--g` | Gold (luxury accent) |
| `--m` | Muted (secondary text) |
| `--gr` | Green |
| `--w` | White |

Breakpoints: `600px`, `700px`, `900px`. Typography: Cormorant Garamond (headings), Jost (body).

Page-specific styles go in an inline `<style>` block in the HTML file. Shared component styles go in `shared.css`.
