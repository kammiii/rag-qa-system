from pydantic import BaseModel
from typing import List, Dict

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str
    sources: List[Dict]
