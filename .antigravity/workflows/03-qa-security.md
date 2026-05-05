# 03-qa-security.md: Rules for Validation, Auditing, and E2E Testing

## 1. Persona & Data Generation
- Maintain a `user-personas.json` to simulate real-world usage scenarios (e.g., "The Merchant", "The Saver", "The Donor").
- Generate comprehensive dummy data matrices for testing edge cases (e.g., zero balances, invalid inputs).

## 2. Security Auditing
- Run OWASP dependency audits (`npm audit`, `pip-audit`) before every major merge.
- Enforce "Least Privilege" for all internal API communications and data access.
- Validate all inputs for XSS, SQL injection, and sovereignty violations (e.g., password attempts).

## 3. Comprehensive Testing
- Every feature must have:
  - Unit tests for core logic (Vitest/PyTest).
  - Integration tests for API communication (Supertest).
  - E2E test scenarios covering the full user journey (Playwright).
- Target minimum 80% code coverage for critical paths.
