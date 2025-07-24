from fastapi import APIRouter
from app.models.query import QuestionRequest, AnswerResponse
from app.services.query_service import answer_question

router = APIRouter()

@router.post("/", response_model=AnswerResponse)
async def ask_question(payload: QuestionRequest):
    result = answer_question(payload.question)
    return AnswerResponse(**result)
