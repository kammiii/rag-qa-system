from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from functools import lru_cache

class Settings(BaseSettings):
    openai_api_key: str = "test-key"
    vector_store_path: str = "vectorstores"
    frontend_url: str = "http://localhost:5173"
    database_url: str

    model_config = SettingsConfigDict(env_file=".env")

@lru_cache
def get_settings():
    return Settings()
