# Siesta Database

## Overview

Siesta uses MySQL/MariaDB through Laravel's Eloquent ORM.

The database contains customer, catalog, order, and content-management data.

## Main Tables

### users

Stores customer and administrator accounts.

Important fields include:

- `id`
- `name`
- `email`
- `password`
- `email_verified_at`
- `is_admin`
- timestamps

`is_admin` defaults to `false`.

Normal registrations therefore create customer accounts.

### categories

Stores product categories.

Important fields:

- `id`
- `name`
- `slug`
- `image`
- `is_active`
- timestamps

Categories can be activated/deactivated.

### products

Stores products available through the storefront.

Important fields include:

- `id`
- `category_id`
- `sku`
- `slug`
- `name`
- `description`
- `price`
- `stock`
- `image`
- `is_featured`
- `is_active`
- timestamps

`category_id` references `categories.id`.

`is_active` provides reversible product availability.

### orders

Stores customer orders.

Important fields include:

- `id`
- `user_id`
- `order_number`
- customer information
- shipping address
- `status`
- `payment_status`
- `payment_method`
- `subtotal`
- `shipping_cost`
- `grand_total`
- `notes`
- timestamps

`user_id` may be nullable for guest checkout.

Authenticated checkout associates the order with the current user.

### order_items

Stores the products captured in an order.

Important fields include:

- order relationship
- product relationship
- product name snapshot
- quantity
- unit price
- line total

Order items retain the purchased product information so historical orders remain meaningful even if the current product changes.

### banners

Stores homepage hero/banner content.

Important fields include:

- `id`
- `image`
- `title`
- `description`
- CTA information
- `sort_order`
- `is_active`
- timestamps

### faqs

Stores public FAQ entries.

Important fields include:

- `id`
- `question`
- `answer`
- `sort_order`
- `is_active`
- timestamps

### contact_information

Stores the current public contact information.

This is a single information record rather than a contact-submission table.

## Relationships

```text
User
 └── hasMany Orders

Category
 └── hasMany Products

Product
 ├── belongsTo Category
 └── hasMany OrderItems

Order
 ├── belongsTo User
 └── hasMany OrderItems

OrderItem
 ├── belongsTo Order
 └── belongsTo Product
```

## Product Lifecycle

Products are not intended to be permanently deleted during normal admin management.

Use:

```text
is_active = true
```

for storefront availability.

Use:

```text
is_active = false
```

to deactivate a product while preserving its data and historical references.

## Category Lifecycle

Categories also support active/deactive behavior.

Deactivation should not orphan products.

Category deletion should be treated carefully because products reference categories.

## Order Lifecycle

Order state and payment state are separate concepts.

Example:

```text
Order status:
pending
processing
completed
cancelled

Payment status:
unpaid
paid
failed
...
```

Exact allowed values should follow the current application implementation rather than being duplicated in documentation.

## Monetary Data

The application currently serializes order totals as numeric values for frontend consumption.

Do not change monetary serialization casually because frontend tests and contracts depend on the current shape.

## Migrations

Migrations are the authoritative source for schema changes.

When changing database structure:

1. create a migration
2. update models/relationships
3. update resources/controllers as required
4. add or update tests
5. run the full test suite

Avoid manually changing production schema without a corresponding migration.

## Seed Data

The database seeder provides baseline development/test data.

Do not assume seeded IDs remain stable unless explicitly required.

Tests should create the records they depend on.
