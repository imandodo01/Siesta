# Siesta Development Guide

## 1. Project Purpose

Siesta is a Laravel + React/Inertia-style e-commerce MVP used as:

-   a portfolio/reference implementation
-   a client demonstration
-   a starting point for future e-commerce projects
-   a functional MVP rather than a final production-ready commerce
    platform

The current repository should be treated as a **working baseline**.
Avoid large architectural changes unless a new requirement actually
requires them.

------------------------------------------------------------------------

## 2. Current Functional Scope

### Customer / Public

-   Home page
-   Hero/banner slider
-   Product catalog
-   Category filtering
-   Product detail
-   Cart
-   Checkout
-   Order creation
-   Order confirmation
-   Payment-stage foundation
-   Register
-   Login
-   Logout
-   Customer account
-   Order history
-   Order detail
-   About page
-   FAQ page
-   Contact information page

### Admin

-   Admin authorization
-   Product list
-   Product create/edit
-   Product image upload
-   Product active/inactive status
-   Product restore
-   Category CRUD
-   Category image upload
-   Category active/inactive status
-   Order list
-   Order detail
-   Order status update
-   Payment status update
-   Hero/banner management
-   FAQ management
-   Contact information management

### Intentionally Not Implemented

-   Real payment gateway
-   Payment webhook handling
-   Shipping/logistics gateway
-   Customer contact-message/ticket system
-   Customer profile management beyond the current account/order flow
-   Full production-grade UX polish
-   Full production deployment configuration

------------------------------------------------------------------------


## 2. Runtime Requirements

Use the following runtime versions for the current Siesta codebase.

### PHP

- PHP: **8.2+**
- Recommended for the current Laravel project: **PHP 8.3**
- Required PHP extensions should be enabled according to the Laravel version used by the project, including:
  - `ctype`
  - `curl`
  - `dom`
  - `fileinfo`
  - `filter`
  - `hash`
  - `mbstring`
  - `openssl`
  - `pcre`
  - `pdo`
  - `pdo_mysql`
  - `session`
  - `tokenizer`
  - `xml`

Check the installed version:

```bash
php -v
```

Check enabled extensions:

```bash
php -m
```

### Node.js

- Node.js: **20.x or newer**
- Recommended: **Node.js 20 LTS**
- npm: use the npm version bundled with the selected Node.js release.

Check versions:

```bash
node -v
npm -v
```

Do not use an old Node.js version for this project. The frontend uses Vite and modern dependencies, so Node 20+ should be treated as the baseline.

### Composer

- Composer: current stable version compatible with the installed PHP version.

Check:

```bash
composer -V
```

### Database

- MySQL or MariaDB
- The current application uses Laravel's MySQL-compatible database configuration.

Typical local configuration:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=siesta
DB_USERNAME=root
DB_PASSWORD=
```

Adjust these values to the local environment.


## 3. Technology

The project currently uses the following stack:

-   PHP / Laravel
-   MySQL or MariaDB
-   React
-   TypeScript/TSX
-   Vite
-   Inertia-style Laravel/React integration
-   Axios
-   Laravel authentication/session/CSRF handling
-   Laravel filesystem/storage for uploaded images
-   PHPUnit/Pest-style Laravel feature tests according to the repository
    configuration

Do not assume exact package versions from this document. Use the
repository's:

-   `composer.json`
-   `package.json`
-   `composer.lock`
-   `package-lock.json`

as the source of truth.

------------------------------------------------------------------------

# 4. Local Development Requirements

Recommended Windows development environment:

-   Windows 10/11
-   PHP
-   Composer
-   Node.js
-   npm
-   MySQL/MariaDB
-   Git
-   A local web server environment such as Laragon

The existing development environment has used Laragon.

------------------------------------------------------------------------

# 5. Installation

## 5.1 Clone / obtain the repository

``` bash
git clone <repository-url>
cd Siesta
```

If the repository already exists, simply enter the project directory:

``` bash
cd /laragon/www/Siesta
```

------------------------------------------------------------------------

## 5.2 Install PHP dependencies

``` bash
composer install
```

Use the PHP version required by `composer.json`.

Check:

``` bash
php -v
composer -V
```

------------------------------------------------------------------------

## 5.3 Install frontend dependencies

``` bash
npm install
```

Check:

``` bash
node -v
npm -v
```

Use the Node version required by the current project/tooling if one is
specified in the repository.

------------------------------------------------------------------------

# 6. Environment Configuration

Copy the Laravel environment file:

``` bash
cp .env.example .env
```

On Windows, if `cp` is unavailable:

``` cmd
copy .env.example .env
```

Generate the application key:

``` bash
php artisan key:generate
```

Configure the database in `.env`.

Example:

``` env
APP_NAME=Siesta
APP_ENV=local
APP_DEBUG=true
APP_URL=http://siesta.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=siesta
DB_USERNAME=root
DB_PASSWORD=
```

Use the actual local database credentials rather than copying these
values blindly.

------------------------------------------------------------------------

# 7. Database Setup

Create an empty database named according to your `.env`.

Then run:

``` bash
php artisan migrate
```

For a fresh development database:

``` bash
php artisan migrate:fresh --seed
```

**Warning:** `migrate:fresh` deletes existing database data.

The current database includes the application's product, category,
order, user, banner, FAQ, contact-information, and related structures
through the repository migrations.

------------------------------------------------------------------------

# 8. Storage Setup

The application uses Laravel's public storage mechanism for uploaded
images.

Create the storage link:

``` bash
php artisan storage:link
```

This is required for public access to uploaded:

-   product images
-   category images
-   banner images

If the link already exists, do not recreate it unnecessarily.

------------------------------------------------------------------------

# 9. Start Development

Run the Laravel development server:

``` bash
php artisan serve
```

In another terminal, run Vite:

``` bash
npm run dev
```

If using Laragon, the Laravel application may instead be served through
the configured local domain.

The exact URL depends on the local environment.

------------------------------------------------------------------------

# 10. Production Build Check

Build the frontend:

``` bash
npm run build
```

This should succeed before considering a development step complete.

------------------------------------------------------------------------

# 11. Testing

Run the complete Laravel test suite:

``` bash
php artisan test
```

A development change should ideally leave the full suite green.

For focused work, run the relevant test file, for example:

``` bash
php artisan test tests/Feature/Auth/AuthenticationTest.php
```

or:

``` bash
php artisan test tests/Feature/Admin/ProductManagementTest.php
```

Do not modify tests merely to make a broken feature pass.

Tests should represent the intended application behavior.

------------------------------------------------------------------------

# 12. Current Baseline

The latest known baseline before stopping active Siesta development:

-   Laravel tests: **49 passed**
-   Assertions: **184**
-   `npm run build`: **passed**

After making new changes, these numbers may change.

Always run the current repository's full suite rather than assuming this
historical baseline remains valid.

------------------------------------------------------------------------

# 13. Important Architecture Decisions

## Orders

Order creation business logic is separated into:

``` text
CreateOrderAction
```

The controller should remain primarily responsible for HTTP concerns.

Do not move the order logic back into the controller unless there is a
concrete reason.

------------------------------------------------------------------------

## Order Response

Order data used by customer-facing pages is serialized through:

``` text
OrderResource
```

This keeps confirmation/payment/order-detail data consistent.

------------------------------------------------------------------------

## Product State

Products use:

``` text
is_active
```

for reversible availability.

The intended behavior is:

``` text
active   -> visible and purchasable
inactive -> unavailable from normal storefront flow
```

Do not introduce Laravel `SoftDeletes` automatically unless a future
requirement actually needs deleted-record semantics.

------------------------------------------------------------------------

## Category State

Categories also use an active/inactive state.

An inactive category:

-   is not shown as a normal storefront filter
-   should not expose its products through normal catalog browsing
-   does not automatically deactivate the products themselves

Product and category state are independent.

------------------------------------------------------------------------

## Product Images

Product images are uploaded through Laravel storage rather than relying
on manually entered paths.

When replacing/deleting images, preserve the existing storage
conventions.

------------------------------------------------------------------------

## Authentication

Authentication uses the existing Laravel authentication/session system.

A previous intermittent 419 problem was caused by a stale CSRF token
being permanently assigned to Axios during initial page load.

The fix was to rely on Laravel's current XSRF cookie rather than keeping
the initial token permanently.

Be careful when modifying:

-   `resources/js/bootstrap.ts`
-   session configuration
-   CSRF configuration
-   Axios configuration
-   login/logout behavior

Always test:

``` text
Register
  ↓
Login
  ↓
Account
  ↓
Logout
  ↓
Login again
  ↓
Refresh
```

------------------------------------------------------------------------

# 14. Admin Authorization

Admin access is controlled by:

``` text
users.is_admin
```

Normal registration creates a normal customer.

Admin routes are protected by:

``` text
auth
admin
```

Expected behavior:

``` text
Guest       -> login
Customer    -> 403
Admin       -> allowed
```

Do not bypass authorization in controllers just to make an admin page
work.

------------------------------------------------------------------------

# 15. Development Workflow

For a new feature:

### Step 1 --- Understand the requirement

Determine:

-   customer behavior
-   admin behavior
-   data required
-   validation
-   permissions
-   edge cases
-   whether the feature is actually necessary

### Step 2 --- Inspect the existing repository

Before creating new architecture, inspect:

-   existing models
-   migrations
-   controllers
-   resources
-   routes
-   React pages/components
-   tests

Reuse existing conventions.

### Step 3 --- Implement the smallest complete feature

Prefer:

``` text
migration
→ model
→ controller/action
→ resource
→ route
→ UI
→ tests
```

only where those layers are actually necessary.

### Step 4 --- Verify

Run:

``` bash
php artisan test
npm run build
```

### Step 5 --- Human review

Manually test the feature as an actual user.

Automated tests can confirm correctness but cannot fully confirm:

-   confusing navigation
-   awkward UX
-   visual hierarchy
-   poor loading behavior
-   unclear labels
-   mobile layout problems

------------------------------------------------------------------------

# 16. Current Development Status

Siesta is currently best treated as:

> **Functional MVP / portfolio sample / client demonstration**

The core commerce flow is implemented.

The next phase should focus on:

1.  Human review
2.  UX corrections
3.  Production-readiness improvements
4.  Performance and loading improvements
5.  Responsive/mobile review
6.  Security review
7.  Final cleanup/refactoring only where justified

Do not continue adding features simply because they could theoretically
be added.

------------------------------------------------------------------------

# 17. Known Review Items

These were identified during manual review and should be handled
deliberately rather than automatically.

### Admin

-   Admin navigation/layout needs cleanup.
-   Product management may need UX refinement around active/inactive
    state.
-   Category management may need UX refinement.
-   Order management is currently acceptable.
-   Hero/banner management exists and should be reviewed visually.

### Customer

-   Product filtering needs to be manually verified and polished.
-   Public navbar is crowded.
-   Image loading could be smoother.
-   Hero slider needs UX review.
-   Login/register/logout should be manually regression-tested.
-   FAQ presentation is acceptable but should be reviewed.
-   Contact information presentation should be reviewed.
-   About page is currently acceptable.

These are **review items**, not instructions to blindly implement all of
them.

------------------------------------------------------------------------

# 18. AI / Codex Development Rules

When continuing Siesta with Codex:

### Prefer prompts that are:

-   scoped to one feature or closely related group
-   explicit about current behavior
-   explicit about what must not change
-   explicit about verification
-   small enough to review afterward

### Avoid:

-   "refactor the entire project"
-   speculative architecture
-   repositories/DTOs/services without a real need
-   redesigning multiple features at once
-   changing tests to hide application bugs
-   implementing features that have not been requested

### Recommended prompt structure

``` text
Goal:
<what needs to be achieved>

Current state:
<important existing behavior>

Problem:
<what is missing or broken>

Requirements:
<specific changes>

Constraints:
<what must not be changed>

Verification:
<tests/build/manual behavior>

Stop after this step and report:
<result>
```

------------------------------------------------------------------------

# 19. Before Continuing Development

Before starting a new feature:

``` bash
git status
php artisan test
npm run build
```

If the baseline is not clean, determine why before adding another
feature.

Create a commit/checkpoint after a stable feature.

Suggested commit style:

``` text
feat: add category management
fix: stabilize authentication csrf flow
refactor: extract order creation action
test: cover customer order history
```

------------------------------------------------------------------------

# 20. Important Principle

Siesta is already a functional MVP.

The purpose of future development should be to make the application:

``` text
functional
→ understandable
→ reliable
→ usable
→ production-ready
```

not:

``` text
functional
→ increasingly abstract
→ increasingly complicated
```

Keep the architecture proportional to the actual requirements.
