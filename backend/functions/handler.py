from fastapi import FastAPI
from mangum import Mangum
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import re

app = FastAPI(title="Falah Browser Classification Engine (Netlify)")

class Alternative(BaseModel):
    title: str
    url: str

class ClassificationRequest(BaseModel):
    url: str
    text: str

class ClassificationResponse(BaseModel):
    verdict: str
    reason: str
    evidence: str
    alternatives: List[Alternative] = []

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

@app.post("/classify", response_model=ClassificationResponse)
async def classify(request: ClassificationRequest) -> ClassificationResponse:
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

@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.0"}

handler = Mangum(app)

