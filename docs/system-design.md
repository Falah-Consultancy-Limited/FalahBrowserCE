# System Design Schema: Falah Browser Ecosystem

## 1. Architecture Overview
Falah Browser follows a **Secure Local-First Hybrid Architecture**. The Desktop client handles the UI and user navigation, while a local Backend service performs heavy-duty Shariah classification and sovereignty auditing.

```mermaid
graph TD
    User((User)) --> Desktop[Electron/React Desktop App]
    Desktop --> |IPC| Preload[Preload Script]
    Preload --> |HTTP/Local| Backend[FastAPI Classification Engine]
    Backend --> |Rule Matching| DB[(Local Sovereign Data)]
    Desktop --> |Auth| SDK[@falah/os-sdk]
    SDK --> |Verify| UmmahID[Ummah ID Service]
```

## 2. Component Communication
### 2.1 Desktop → Backend (Classification)
- **Trigger**: Every URL change or significant DOM update.
- **Protocol**: HTTP/REST (Port 8000).
- **Latency Target**: < 200ms for initial verdict.
- **Handling**: If the backend returns `blocked`, the Desktop UI must overlay an "Intervention" screen and prevent content rendering.

### 2.2 Desktop → @falah/os-sdk (Sovereignty)
- **Purpose**: Authenticate user via Ummah ID and manage the Sovereign Wallet for protocol fees or micro-donations.
- **Integration**: Loaded via `preload.cjs` to expose secure bridging to the React frontend.

## 3. Data Flow & Sovereignty
- **Browsing History**: Stored locally in an encrypted SQLite database. Never sent to the cloud.
- **Bookmarks**: Encrypted with the user's private key managed by the Sovereign Wallet.
- **Classification Rules**: Regularly updated via a signed "Falah Registry" stream.

## 4. Security Model
- **Process Isolation**: Backend runs in a separate process from the UI.
- **API Security**: Backend only accepts connections from `localhost`.
- **Content Security Policy (CSP)**: Strict CSP in the Desktop app to prevent unauthorized script execution.
