from tiktoken import get_encoding

encoding = get_encoding("cl100k_base")  # for GPT-4 / ada-002 embeddings

def chunk_text(text: str, max_tokens=500, overlap=100) -> list[str]:
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        chunk = " ".join(words[start:start + max_tokens])
        if len(encoding.encode(chunk)) <= max_tokens:
            chunks.append(chunk)
        start += max_tokens - overlap
    return chunks
