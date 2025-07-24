from app.core.config import get_settings
from openai import OpenAI
from app.vectorstore.docarray_client import get_context_for_question

settings = get_settings()
client = OpenAI(api_key=settings.openai_api_key)


PROMPT_TEMPLATE = """You are a helpful assistant. Use only the context provided to answer the question.
If unsure, say "I don't know".

Context:
{context}

Question:
{question}

Answer:"""

def answer_question(question: str) -> dict:
    context, metadatas = get_context_for_question(question)

    prompt = PROMPT_TEMPLATE.format(context=context, question=question)

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return {
        "answer": response.choices[0].message.content.strip(),
        "sources": metadatas
    }
