import uuid
import tempfile
from fastapi import UploadFile
from app.utils.pdf_extractor import extract_text_from_pdf
from app.utils.chunker import chunk_text
from app.vectorstore.docarray_client import save_documents

async def process_uploaded_document(file: UploadFile) -> tuple[str, int]:
    doc_id = str(uuid.uuid4())

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    pages = extract_text_from_pdf(tmp_path)

    chunks = []
    for page in pages:
        for chunk in chunk_text(page["text"]):
            chunks.append({
                "text": chunk,
                "page_number": page["page_number"]
            })

    save_documents(chunks, doc_id)

    return doc_id, len(chunks)
