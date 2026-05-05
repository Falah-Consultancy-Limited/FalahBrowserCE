# 02-developer.md: Rules for Modular, Type-Safe Development

## 1. Strictly Typed Environment
- TypeScript must be used for all frontend/SDK code with `strict: true` and `noImplicitAny: true`.
- Python (for backend) must use Type Hints and be validated with `mypy`.

## 2. Zero-Technical-Debt Policy
- No "TODO" comments without a corresponding issue ticket.
- No hardcoded secrets or environment-specific URLs; use `.env` and configuration objects.
- Functions must be pure where possible and limited to a single responsibility.

## 3. Modular Code Structure
- Follow a standardized directory structure (e.g., `/components`, `/services`, `/hooks`, `/utils`).
- Shared logic must be extracted into the `@falah/os-sdk` or local utility packages.
- Every commit must be linted and pass type-checking.
