from app.vectorstore.docarray_client import save_documents

def index_chunks(chunks: list[dict], doc_id: str):
    save_documents(chunks, doc_id)
