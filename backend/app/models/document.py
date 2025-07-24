from pydantic import BaseModel

class UploadResponse(BaseModel):
    document_id: str
    num_chunks: int
