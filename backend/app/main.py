from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import upload, query
from app.core.config import get_settings

settings = get_settings()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/upload")
app.include_router(query.router, prefix="/ask")
