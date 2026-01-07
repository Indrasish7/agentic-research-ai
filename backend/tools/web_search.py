import os
from google import genai

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def web_search(query: str) -> str:
    """
    LLM-powered web research tool.
    Simulates research without hardcoding domain logic.
    """

    prompt = f"""
You are a research assistant.

Task:
- Research the following query
- Produce factual, structured information
- No markdown
- No explanations about what you are doing

Query:
"{query}"
"""

    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt
    )

    return response.text.strip()
