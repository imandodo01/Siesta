# Siesta Architecture Decisions

This document records important decisions so future development does not repeatedly revisit settled questions.

## ADR-001 — Keep the storefront lightweight

**Decision:** Use conventional Laravel + React/Inertia structure without a large domain architecture.

**Reason:** The application is currently an MVP. Repositories, DTOs, domain services, and feature packages would add ceremony without solving current complexity.

**Consequence:** Introduce abstractions only when real complexity or duplication appears.

## ADR-002 — Preserve guest checkout

**Decision:** Customers can checkout without creating an account.

**Reason:** Guest checkout reduces friction and was part of the intended storefront flow.

**Consequence:** Orders may exist without `user_id`. Authenticated orders should store the authenticated user.

## ADR-003 — Associate authenticated orders with users

**Decision:** Authenticated checkout stores `orders.user_id`.

**Reason:** Customer order history requires reliable ownership.

**Consequence:** Account order queries must use authenticated ownership rather than email matching.

## ADR-004 — Protect order ownership

**Decision:** A customer must only access their own account orders.

**Reason:** Email matching is insufficient as an authorization boundary because multiple users may share an email or a malicious request could attempt enumeration.

**Consequence:** Account order detail/history uses authenticated user ownership.

## ADR-005 — Use `is_admin` for MVP admin authorization

**Decision:** Admin authorization uses `users.is_admin` plus middleware.

**Reason:** The MVP needs a simple administrator boundary, not a complete role/permission framework.

**Consequence:** Future role systems can replace this if the application grows.

## ADR-006 — Use reversible product deactivation

**Decision:** Product management uses `is_active` rather than permanent deletion.

**Reason:** Products may need to be restored and historical order data should remain safe.

**Consequence:** Storefront and checkout must exclude inactive products.

## ADR-007 — Use database-backed categories

**Decision:** Categories are represented by a dedicated table and product relationship.

**Reason:** Category management, filtering, images, and active/deactive behavior require more than a plain product string.

**Consequence:** Legacy category values were migrated/backfilled into category records.

## ADR-008 — Keep contact as information, not ticketing

**Decision:** The current Contact page represents business contact information only.

**Reason:** The MVP does not require customer support ticket management.

**Consequence:** Admin manages the public contact information record. A submission workflow can be added later if required.

## ADR-009 — Use database-backed homepage banners

**Decision:** Homepage hero content is manageable by admin.

**Reason:** Promotional storefront content should not require code changes.

**Consequence:** Active banners are ordered and displayed as a simple slider. A static hero remains as fallback.

## ADR-010 — Payment stage before real payment integration

**Decision:** Build the customer-facing payment stage before connecting a real gateway.

**Reason:** This allows the storefront order flow and UI to stabilize independently of provider credentials/webhooks.

**Consequence:** Current payment state is structural only. Real payment processing remains future work.

## ADR-011 — Use Laravel resources for shared order serialization

**Decision:** Read-side order data is centralized through `OrderResource`.

**Reason:** Confirmation, payment, and account pages consume overlapping order structures.

**Consequence:** Changes to order page contracts should be made deliberately because multiple frontend pages depend on them.

## ADR-012 — Extract order creation into an action

**Decision:** Order creation business logic lives in `CreateOrderAction`.

**Reason:** `OrderController::store()` had accumulated validation, stock, totals, order creation, and transaction responsibilities.

**Consequence:** HTTP orchestration remains in the controller while business workflow is isolated and testable.

## ADR-013 — Keep CartContext

**Decision:** Keep cart state in a dedicated React context.

**Reason:** Cart state is shared across storefront pages but is still small enough that a global state library is unnecessary.

**Consequence:** Reconsider only if cart logic becomes substantially more complex.

## ADR-014 — Cookie-based Laravel XSRF handling

**Decision:** Axios uses Laravel's current XSRF cookie rather than a permanent token copied from initial page markup.

**Reason:** Session regeneration after authentication/logout can invalidate a static token and cause intermittent 419 errors.

**Consequence:** Frontend authentication flows must preserve Laravel's cookie/XSRF behavior.

