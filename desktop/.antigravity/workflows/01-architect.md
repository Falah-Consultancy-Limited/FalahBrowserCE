# Phase 01: Architect - Governance & Design

## Objective
To ensure every feature is built on a foundation of scalable, enterprise-grade architecture and robust data modeling.

## Core Rules
1. **Ideation & Design**: Every new feature must begin with a clear architectural diagram (Mermaid) and a design specification.
2. **Data Modeling**: Use strictly typed schemas (TypeScript interfaces or Pydantic models). Enforce normalization and data integrity at the edge.
3. **API Contracts**: All internal and external communication must follow RESTful principles or strictly defined IPC protocols. API documentation is mandatory before implementation.
4. **Scalability**: Design for a multi-window, multi-process environment (Electron best practices).
5. **Security by Design**: Principle of least privilege for all system access. Preload scripts must be minimal and use `contextBridge`.

## Deliverables
- Mermaid Architecture Diagrams
- API/IPC Contract Definitions
- Data Schema Documentation
