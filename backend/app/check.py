from app.services.query_service import answer_question

result = answer_question("What is the termination clause in the NDA?")
print(result["answer"])
print("Sources:", result["sources"])
