from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import re
import uvicorn

app = FastAPI(
    title="Falah Browser Classification Engine",
    version="1.0.0",
    docs_url="/v1/docs",
    redoc_url="/v1/redoc"
)

# --- Models ---

class Alternative(BaseModel):
    title: str
    url: str

class ClassificationRequest(BaseModel):
    url: str = Field(..., example="https://example.com")
    text: str = Field(..., example="Page content goes here")

class ClassificationResponse(BaseModel):
    verdict: str = Field(..., pattern="^(safe|caution|warning|blocked)$")
    reason: str
    evidence: str
    alternatives: List[Alternative] = []

class HealthResponse(BaseModel):
    status: str
    version: str

# --- Classification Rules ---

RULES: List[Dict] = [
    {
        "pattern": r"alcohol|wine|beer|liquor",
        "verdict": "caution",
        "reason": "Content related to intoxicants.",
        "evidence": "Detected mention of substances prohibited in Islam.",
        "alternatives": [{"title": "Halal Beverages", "url": "https://www.halalzilla.com/halal-mocktails-recipes/92842"}]
    },
    {
        "pattern": r"gambling|casino|betting|poker",
        "verdict": "blocked",
        "reason": "Content related to gambling (Maisir).",
        "evidence": "Detected gambling-related keywords.",
        "alternatives": []
    },
    {
        "pattern": r"interest|usury|loan shark|pawn shop",
        "verdict": "caution",
        "reason": "Content may involve Riba (Interest).",
        "evidence": "Detected financial terms related to usury.",
        "alternatives": [{"title": "Islamic Finance Principles", "url": "https://www.islamic-relief.org.uk/about-us/what-is-islamic-finance/"}]
    },
]

# --- Endpoints ---

@app.get("/v1/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Returns the health status of the classification engine."""
    return HealthResponse(status="ok", version="1.0.0")

@app.post("/v1/classify", response_model=ClassificationResponse)
async def classify(request: ClassificationRequest) -> ClassificationResponse:
    """Analyzes text content for Shariah compliance."""
    text_content = request.text.lower()
    
    for rule in RULES:
        if re.search(rule["pattern"], text_content):
            return ClassificationResponse(
                verdict=rule["verdict"],
                reason=rule["reason"],
                evidence=rule["evidence"],
                alternatives=rule["alternatives"]
            )
    
    return ClassificationResponse(
        verdict="safe",
        reason="No immediate concerns detected. May Allah guide your journey.",
        evidence="Clean content scan.",
        alternatives=[]
    )

if __name__ == "__main__":
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)

