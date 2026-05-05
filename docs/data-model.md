# Data Model: Sovereign & Encrypted Storage

This document defines the storage schemas for Falah Browser, adhering to the **Sovereign-First** data policy.

## 1. Storage Technology
- **Primary Database**: SQLite (via `sql.js` or `better-sqlite3`).
- **Encryption**: AES-256-GCM using keys derived from the user's Sovereign Wallet seed.

## 2. Entity: BrowsingHistory
Stores a local-only record of visited pages.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key. |
| `url` | `String` | Encrypted URL. |
| `title` | `String` | Encrypted Page Title. |
| `timestamp` | `DateTime` | Visit time. |
| `verdict` | `String` | The Shariah verdict received at time of visit. |

## 3. Entity: EncryptedBookmarks
Stores user-curated links.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key. |
| `url` | `String` | Encrypted URL. |
| `label` | `String` | User-defined label (Encrypted). |
| `tags` | `Array` | List of tags for categorization. |
| `created_at` | `DateTime` | Creation time. |

## 4. Entity: ClassificationCache
Optimizes performance by caching recent classification results.

| Field | Type | Description |
| :--- | :--- | :--- |
| `url_hash` | `String` | SHA-256 hash of the URL. |
| `verdict` | `String` | Cached verdict. |
| `expiry` | `DateTime` | Cache TTL (default 24 hours). |

## 5. Sovereignty Rules
1. **No External Sync**: Data remains on the local device unless the user explicitly exports a signed backup.
2. **Zero-Knowledge**: The system operator (Falah OS) cannot read browsing history or bookmarks.
3. **Wipe on Request**: A "Sovereign Reset" command immediately purges all local databases and keys.
