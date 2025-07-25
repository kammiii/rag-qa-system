from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_lessons():
    return [{"level": "A1.1"}, {"level": "A1.2"}, {"level": "A2.1"}]
