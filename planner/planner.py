"""
Planner module for Agentic Research AI.

Responsibilities:
- Convert a high-level goal into a structured execution plan
- Output ONLY valid JSON
- No explanations, no markdown
"""
from dotenv import load_dotenv
load_dotenv()

import os
import json
from typing import Dict, Any

from google import genai


class Planner:
    def __init__(self, model_name: str = "gemini-3-flash-preview"):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_name = model_name

    def generate_plan(self, goal: str) -> Dict[str, Any]:
        prompt = self._build_prompt(goal)

        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt
        )

        text = response.text.strip()

        try:
            return json.loads(text)
        except json.JSONDecodeError:
            raise ValueError(
                f"Planner produced invalid JSON:\n{text}"
            )

    def _build_prompt(self, goal: str) -> str:
        return f"""
You are a planning module inside an autonomous agentic AI system.

Your task:
- Convert the given goal into a minimal, structured execution plan.
- Output ONLY valid JSON.
- Do NOT include explanations, markdown, or extra text.

Available tools:
1. web_search(query: string)
2. summarizer(text: string)
3. python_executor(code: string)

Rules:
- Each step must use exactly one tool.
- Steps must be sequential and minimal.
- The plan must be sufficient to solve the goal.

Goal:
"{goal}"

Output format:
{{
  "objective": "...",
  "steps": [
    {{
      "id": 1,
      "tool": "tool_name",
      "input": "tool input"
    }}
  ]
}}
"""
