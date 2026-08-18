# Siesta Design System

## Purpose

This document records the current UI conventions. It is intentionally small because the MVP is still in a review/polish stage.

The existing implementation is the visual source of truth. Do not redesign the entire system during feature work unless explicitly requested.

## Visual Direction

- warm
- minimal
- clean
- product-focused
- spacious
- approachable

## Layout

Use:

- responsive containers
- clear page hierarchy
- generous spacing
- readable content widths
- consistent section spacing

Avoid:

- unnecessary dense dashboards on the storefront
- excessive decoration
- inconsistent card spacing
- deeply nested visual containers

## Components

Common UI patterns include:

- buttons
- inputs
- cards
- product cards
- status indicators
- navigation
- footer
- form sections
- order summaries
- admin tables/forms

Prefer existing shared components when they already solve the problem.

## Product Presentation

Product imagery is a major storefront element.

Product cards should prioritize:

1. image
2. product name
3. price
4. relevant status/category information
5. clear interaction

Image loading should remain visually stable and should not cause avoidable layout jumps.

## Forms

Forms should provide:

- clear labels
- useful placeholders where appropriate
- visible validation errors
- disabled/loading state during submission
- clear primary action

## Statuses

Status displays should be visually distinguishable but remain understandable without relying only on color.

Relevant states include:

- active/inactive
- pending/processing/completed/cancelled
- unpaid/paid/failed

## Navigation

The current navigation is functional but remains a known polish area.

Future navigation work should prioritize:

- reducing crowding
- clearer separation between storefront and account actions
- clearer admin navigation
- mobile usability

## Responsive Behavior

The storefront should work on:

- desktop
- tablet
- mobile

Do not assume desktop width when adding new UI.

## Typography

The actual font configuration in the repository is the source of truth.

When changing typography, update this document with the selected font family and usage rules rather than introducing isolated font choices.

## Colors

The existing Tailwind classes/theme configuration are the current source of truth.

Do not invent a new palette in individual components.

## Accessibility

At minimum:

- interactive controls should be keyboard accessible
- form inputs require labels
- images should have meaningful alt text when content-bearing
- accordions should expose their expanded/collapsed state
- buttons and links should remain distinguishable

## Admin UI

Admin is a functional management interface rather than the primary brand experience.

Admin UI should prioritize:

- clarity
- discoverability
- efficient forms
- readable tables
- obvious status/actions

Admin navigation cleanup remains a known future polish item.
