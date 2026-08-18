# Siesta Roadmap

## Current Position

Siesta has reached a functional MVP foundation suitable for:

- internal review
- portfolio demonstration
- client requirement validation
- identifying production-grade polish requirements

The project is intentionally paused before a deeper production hardening/refinement phase.

## MVP — Completed

### Storefront

- [x] Home
- [x] Product catalog
- [x] Product detail
- [x] Cart
- [x] Checkout
- [x] Order confirmation
- [x] Payment-stage foundation
- [x] About
- [x] FAQ
- [x] Contact information
- [x] Homepage hero/banner management
- [x] Product category filtering

### Customer

- [x] Registration
- [x] Login
- [x] Logout
- [x] Account page
- [x] Order history
- [x] Order detail
- [x] Authenticated order ownership
- [x] Guest checkout preserved
- [x] Laravel XSRF/authentication stabilization

### Catalog

- [x] Product CRUD
- [x] Product image upload
- [x] Product activation/deactivation
- [x] Category CRUD
- [x] Category image upload
- [x] Category activation/deactivation
- [x] Database-backed category filtering
- [x] Inactive-product protection

### Orders

- [x] Order creation
- [x] Stock validation
- [x] Stock decrement
- [x] Order confirmation
- [x] Payment-stage page
- [x] Admin order list
- [x] Admin order detail
- [x] Order status management
- [x] Payment status management

### Content Management

- [x] Banner management
- [x] Banner image upload
- [x] Banner activation/deactivation
- [x] Banner ordering
- [x] Homepage slider
- [x] FAQ management
- [x] FAQ activation/deactivation
- [x] Contact information management

### Engineering

- [x] Order creation action
- [x] Order resource
- [x] Checkout component extraction
- [x] Authentication regression coverage
- [x] Admin authorization tests
- [x] Catalog/category tests
- [x] Content-management tests
- [x] Green Laravel test suite at current checkpoint
- [x] Successful production frontend build

## Review / Polish

These are known review items rather than architectural blockers.

- [ ] Admin navigation/layout cleanup
- [ ] Reduce storefront navigation crowding
- [ ] Refine product filtering UX
- [ ] Improve image loading experience
- [ ] Review mobile layouts
- [ ] General visual polish
- [ ] Improve empty/loading/error states
- [ ] Review content and copy for client-facing presentation

## Future Production Features

These should be implemented only when the actual client requirements justify them.

- [ ] Real payment gateway integration
- [ ] Payment webhook handling
- [ ] Indonesian logistics/courier integration
- [ ] Shipping-rate selection
- [ ] Customer profile management
- [ ] Discount system
- [ ] Voucher/coupon system
- [ ] Advanced product filtering/search
- [ ] Inventory synchronization / ERP integration
- [ ] More complete admin dashboard
- [ ] Customer contact/ticket submission
- [ ] Notification/email workflow
- [ ] Audit logging
- [ ] More granular roles/permissions

## Production Hardening

Before treating the project as production-ready, review:

- [ ] authorization boundaries
- [ ] validation rules
- [ ] upload validation/security
- [ ] image optimization
- [ ] storage configuration
- [ ] error handling
- [ ] logging
- [ ] rate limiting
- [ ] CSRF/session behavior
- [ ] database indexes
- [ ] transaction boundaries
- [ ] payment reconciliation
- [ ] shipping integration reliability
- [ ] deployment configuration
- [ ] backups
- [ ] monitoring

## Portfolio / Client Demo Goal

The current Siesta state is useful as an MVP demonstration.

The purpose is to show a realistic working storefront rather than claim that every production concern has already been solved.

For client work, use this project to validate:

1. required storefront pages
2. customer journey
3. admin workflow
4. catalog management
5. order management
6. content management
7. integration requirements

Only after those requirements are confirmed should production-specific integrations and hardening be added.
