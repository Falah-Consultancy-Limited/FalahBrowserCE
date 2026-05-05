# 01-architect.md: Rules for Ideation, System Design, and API Contracts

## 1. Ideation & Conceptualization
- Every feature must be mapped to a specific user problem within the Falah OS ecosystem.
- Prioritize sovereign, privacy-preserving, and Shariah-compliant design patterns.

## 2. System Design & Enterprise Architecture
- Follow a modular, service-oriented architecture.
- Enforce strict separation of concerns (SOC) between core logic, data access, and transport layers.
- Data modeling must prioritize normalization and relational integrity (reserved for persistence phases).

## 3. API Contract Generation
- Define all APIs using a "Contract-First" approach (e.g., OpenAPI/Swagger).
- Every endpoint must include:
  - Versioning (e.g., /v1/...).
  - Standardized error response objects.
  - Rate limiting and authentication decorators.
- API documentation must be auto-generated and kept in sync with the implementation.
