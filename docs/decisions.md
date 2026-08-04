# ADR-001

## Title

Single Business with Multi-Branch Architecture

## Status

Accepted

## Context

Siesta targets businesses operating one organization with one or more physical branches.

## Decision

The application will not support multi-tenant merchants in version 1.x.

Branch support will be included from the beginning.

## Consequences

Simpler authorization.

Simpler inventory model.

Scalable enough for SMEs.

Future migration to multi-tenant remains possible.
