import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def summarize(text: str) -> str:
    if not text or "Error" in text:
        return "Error: No content available for summarization"

    prompt = f"""
You are a summarization module.

Task:
- Summarize the following content concisely
- Preserve key facts
- No markdown
- No explanations

Content:
{text}
"""

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt
    )

    return response.text.strip()
