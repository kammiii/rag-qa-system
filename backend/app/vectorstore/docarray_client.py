from langchain.vectorstores import DocArrayInMemorySearch
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.docstore.document import Document
from app.core.config import get_settings

settings = get_settings()

# Create a singleton-style instance
embedding = OpenAIEmbeddings()
vectorstore = DocArrayInMemorySearch.from_texts([], embedding)

def save_documents(chunks: list[dict], doc_id: str):
    global vectorstore

    docs = [
        Document(
            page_content=chunk["text"],
            metadata={
                "page_number": chunk["page_number"],
                "doc_id": doc_id
            }
        )
        for chunk in chunks
    ]
    vectorstore.add_documents(docs)

def retrieve_similar(question: str, k: int = 5) -> list[Document]:
    return vectorstore.similarity_search(question, k=k)

def get_context_for_question(question: str, k: int = 5) -> tuple[str, list[dict]]:
    docs = retrieve_similar(question, k)
    context = "\n\n".join([doc.page_content for doc in docs])
    metadata = [doc.metadata for doc in docs]
    return context, metadata
