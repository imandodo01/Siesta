# Siesta API & Route Reference

## Overview

Siesta uses Laravel for the backend and React/Inertia for the storefront UI. Most application interactions are exposed through Laravel web routes and Inertia page responses. Checkout submission uses an HTTP request from the React frontend.

This document records the current MVP-facing route contracts. It is not intended to be a complete Laravel framework route dump.

## Authentication

| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | `/login` | Guest | Login page |
| POST | `/login` | Guest | Authenticate customer/admin |
| GET | `/register` | Guest | Registration page |
| POST | `/register` | Guest | Create customer account |
| POST | `/logout` | Authenticated | End session |

Authentication uses Laravel session-based authentication.

## Public Storefront

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Storefront home |
| GET | `/products` | Product catalog |
| GET | `/products/{product}` | Product detail |
| GET | `/cart` | Shopping cart |
| GET | `/checkout` | Checkout |
| POST | `/checkout` | Create order |
| GET | `/checkout/confirmation/{order}` | Order confirmation |
| GET | `/checkout/payment/{order}` | Payment-stage page |
| GET | `/about` | About page |
| GET | `/faq` | Public FAQ |
| GET | `/contact` | Public contact information |

## Customer Account

All account routes require authentication.

| Method | Route | Purpose |
|---|---|---|
| GET | `/account` | Customer account |
| GET | `/account/orders` | Customer order history |
| GET | `/account/orders/{order}` | Customer order detail |

Order access must be limited to the authenticated customer. Orders are associated through `orders.user_id`.

## Admin

Admin routes require both `auth` and admin authorization.

| Method | Route | Purpose |
|---|---|---|
| GET | `/admin` | Admin landing page |
| GET | `/admin/products` | Product management |
| GET | `/admin/products/create` | Product creation form |
| POST | `/admin/products` | Create product |
| GET | `/admin/products/{product}/edit` | Product edit form |
| PUT | `/admin/products/{product}` | Update product |
| GET | `/admin/orders` | Order management |
| GET | `/admin/orders/{order}` | Order detail |
| PUT | `/admin/orders/{order}` | Update order/payment status |
| GET | `/admin/categories` | Category management |
| POST | `/admin/categories` | Create category |
| PUT | `/admin/categories/{category}` | Update category |
| GET | `/admin/banners` | Banner management |
| POST | `/admin/banners` | Create banner |
| PUT | `/admin/banners/{banner}` | Update banner |
| DELETE | `/admin/banners/{banner}` | Delete banner |
| GET | `/admin/faqs` | FAQ management |
| POST | `/admin/faqs` | Create FAQ |
| PUT | `/admin/faqs/{faq}` | Update FAQ |
| DELETE | `/admin/faqs/{faq}` | Delete FAQ |
| GET | `/admin/contact` | Contact information management |
| PUT | `/admin/contact` | Update contact information |

Exact route details should be confirmed against `routes/web.php` when the application evolves.

## Checkout Contract

The checkout request currently contains customer/shipping information and the selected cart items are resolved server-side.

Important server responsibilities:

- validate submitted customer information
- validate cart contents
- verify product availability
- calculate subtotal
- calculate shipping
- create the order
- create order items
- decrement stock
- associate authenticated orders with `user_id`
- return the order reference used by confirmation/payment pages

Order creation business logic lives in `CreateOrderAction`.

## Order Response

Read-side order serialization is centralized through `OrderResource`.

Important fields include:

- `order_number`
- `customer_name`
- `customer_email`
- `phone`
- `address`
- `city`
- `postal_code`
- `status`
- `payment_status`
- `payment_method`
- `subtotal`
- `shipping_cost`
- `grand_total`
- `notes`
- `items`

Item fields include:

- `product_name`
- `quantity`
- `unit_price`
- `line_total`

Numeric monetary values are currently serialized as numeric values, not formatted currency strings.

## Authentication / CSRF

Axios requests use Laravel's cookie-based XSRF mechanism. The frontend must not permanently copy an initial CSRF token into a static Axios header because session regeneration can invalidate that value.

## Not Yet Implemented

- Real payment gateway processing
- Payment webhooks
- Logistics/courier gateway integration
- Customer contact/ticket submission
- Advanced API authentication for external consumers
