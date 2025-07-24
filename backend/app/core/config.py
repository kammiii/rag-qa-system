from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache

class Settings(BaseSettings):
    openai_api_key: str = Field("test-key", env="OPENAI_API_KEY")
    vector_store_path: str = "vectorstores"

    class Config:
        env_file = ".env"
        extra = "ignore"

@lru_cache
def get_settings():
    return Settings()
