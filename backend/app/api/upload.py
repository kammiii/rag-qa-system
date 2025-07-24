from fastapi import APIRouter, File, UploadFile
from app.services.document_service import process_uploaded_document
from app.models.document import UploadResponse

router = APIRouter()

@router.post("/", response_model=UploadResponse)
async def upload_pdf(file: UploadFile = File(...)):
    doc_id, num_chunks = await process_uploaded_document(file)
    return UploadResponse(document_id=doc_id, num_chunks=num_chunks)
