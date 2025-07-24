from pypdf import PdfReader

def extract_text_from_pdf(file_path: str) -> list[dict]:
    reader = PdfReader(file_path)
    pages = []

    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if text:
            pages.append({
                "page_number": i + 1,
                "text": text.strip()
            })
    return pages
