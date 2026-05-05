# API Contract: Falah Browser Backend (v1)

**Protocol:** REST/JSON  
**Base URL:** `http://localhost:8000/v1`

---

## 1. POST /classify
Analyzes page content (URL + Text) for Shariah compliance and safety.

### Request Body
| Field | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `url` | `string` | The full URL of the page being visited. | Yes |
| `text` | `string` | The extracted text content from the page. | Yes |

### Response Body (200 OK)
| Field | Type | Description |
| :--- | :--- | :--- |
| `verdict` | `string` | One of: `safe`, `caution`, `warning`, `blocked`. |
| `reason` | `string` | Human-readable explanation of the verdict. |
| `evidence` | `string` | Technical reason or matched pattern. |
| `alternatives` | `array` | List of recommended alternative links/content. |

#### Verdict Definitions
- `safe`: Content is permissible (Halal).
- `caution`: Content contains gray areas or discouraged items (Makruh).
- `warning`: Content contains significant risks or violations.
- `blocked`: Content is explicitly prohibited (Haram).

---

## 2. GET /health
Returns the health status of the classification engine.

### Response Body (200 OK)
| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | `string` | `ok` or `degraded`. |
| `version` | `string` | Current version of the engine. |

---

## 3. Future Endpoints (Reserved)
- `POST /v1/identity/verify`: Integrates with `@falah/os-sdk` for user session validation.
- `POST /v1/bookmarks/encrypt`: Encrypted bookmarks storage.
