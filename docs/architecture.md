# Siesta Architecture

## Overview

Siesta is a small Laravel + React/Inertia e-commerce storefront MVP.

The architecture intentionally stays lightweight. The project uses conventional Laravel structure with focused actions/resources where actual complexity exists, rather than introducing repositories, DTOs, domain-service layers, or a large module framework prematurely.

## Main Stack

- PHP / Laravel
- React
- Inertia
- TypeScript
- Vite
- MySQL/MariaDB
- Laravel session authentication
- Local/public filesystem storage for uploaded images

## Backend Structure

### Models

Models represent persistent application data and relationships.

Important models:

- `User`
- `Product`
- `Category`
- `Order`
- `OrderItem`
- `Banner`
- `Faq`
- `ContactInformation`

### Controllers

Controllers handle HTTP concerns and coordinate application operations.

Examples:

- `CatalogController`
- `OrderController`
- `CustomerAccountController`
- Admin product/order/category/content controllers

Controllers should avoid accumulating large business workflows.

### Actions

`CreateOrderAction` owns the core order-creation workflow:

- cart validation
- stock validation
- subtotal calculation
- shipping calculation
- order creation
- order-item creation
- stock decrement
- transaction behavior

The controller remains responsible for HTTP validation, calling the action, and returning the response.

### Resources

`ProductResource`, `CategoryResource`, and `OrderResource` provide consistent response/data shaping.

`OrderResource` is particularly important because confirmation, payment, and account views consume the same order structure.

## Frontend Structure

The frontend uses React/TypeScript with Inertia pages.

Major areas:

- public storefront pages
- cart
- checkout
- customer account
- admin pages
- shared layouts/components
- cart context

### Cart

`CartContext` is the central client-side cart state boundary.

It is intentionally kept simple. A larger state-management library is not justified by the current scope.

### Checkout

Checkout orchestration remains at page level while visual sections are separated into focused components.

Current extracted sections include:

- customer information
- shipping address
- order summary

The page handles:

- cart access
- form state
- validation
- submission
- cart clearing
- redirect
- empty-cart state

## Authentication

Authentication uses the existing Laravel session authentication flow.

Public navigation exposes:

- Login
- Register

Authenticated navigation exposes:

- Account
- Logout

Customer orders are associated with `users.id` through `orders.user_id`.

Admin authorization is currently represented by `users.is_admin` and an admin middleware.

Normal registrations create non-admin customers.

## Admin

The admin area is intentionally minimal.

Current management areas:

- products
- categories
- orders
- banners
- FAQs
- contact information

The admin landing page currently serves as a simple entry point rather than a full analytics dashboard.

## Product Availability

Products use `is_active` for reversible storefront availability.

Inactive products:

- should not appear as normal storefront products
- should not be purchasable through checkout

This avoids destructive deletion while preserving historical order references.

Categories also have an active/deactive lifecycle.

## Content Management

### Banners

Banners are stored in the database and can contain:

- image
- title
- description
- optional CTA
- sort order
- active state

The storefront displays active banners in order and retains a static hero fallback when no active banner exists.

### FAQs

FAQs are database-backed and can be:

- created
- edited
- activated/deactivated
- deleted
- sorted

The public FAQ displays active entries.

### Contact

The current Contact page is an information page, not a customer support ticket system.

Admin manages a single contact-information record containing items such as:

- email
- phone
- address
- business hours

A contact submission/ticket workflow is not currently part of the MVP.

## Storage

Uploaded product, category, and banner images use Laravel's public storage mechanism.

The public storage link must exist:

```bash
php artisan storage:link
```

## Architectural Principles

1. Keep controllers thin when business logic becomes substantial.
2. Extract only real complexity.
3. Keep frontend feature boundaries understandable.
4. Prefer Laravel conventions over custom architecture.
5. Preserve guest checkout.
6. Protect authenticated order ownership.
7. Use reversible product/category activation instead of unnecessary destructive deletion.
8. Avoid speculative abstraction.

## Current Boundary

The application is currently small enough that deeper feature packages, repositories, DTO layers, or a dedicated domain architecture are not justified.

Refactoring should resume only when actual complexity requires it.
