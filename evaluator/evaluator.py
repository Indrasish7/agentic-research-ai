from google import genai
import os


class Evaluator:
    """
    LLM-based evaluator that decides whether a step
    succeeded, should be retried, or failed.

    Tool-aware and tolerant of partial outputs.
    """

    def __init__(self, max_retries: int = 2):
        self.max_retries = max_retries
        self.retry_count = {}
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    def evaluate(self, step: dict, output: str) -> str:
        step_id = step["id"]
        step_goal = step["input"]

        if step_id not in self.retry_count:
            self.retry_count[step_id] = 0

        if output is None:
            return self._retry_or_fail(step_id)

        lowered_output = output.lower()

        # --- TOOL-AWARE SUCCESS CONDITIONS ---
        if step["tool"] == "web_search":
            # Structured search results → success
            if "[" in output and "name" in lowered_output:
                return "success"

        # --- SOFT FAILURES (retryable) ---
        if "error" in lowered_output:
            return self._retry_or_fail(step_id)

        # Generic placeholder search output (no structure)
        if "search results for query" in lowered_output:
            return self._retry_or_fail(step_id)

        # --- LLM-BASED SEMANTIC EVALUATION ---
        prompt = f"""
You are an evaluation module in an agentic AI system.

Step goal:
"{step_goal}"

Step output:
\"\"\"{output}\"\"\"

Decide whether the output sufficiently satisfies the step goal.

Respond with exactly ONE word:
success | retry | fail
"""

        response = self.client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        decision = response.text.strip().lower()

        if decision not in {"success", "retry", "fail"}:
            return self._retry_or_fail(step_id)

        if decision == "retry":
            return self._retry_or_fail(step_id)

        return decision

    def _retry_or_fail(self, step_id: int) -> str:
        self.retry_count[step_id] += 1
        if self.retry_count[step_id] <= self.max_retries:
            return "retry"
        return "fail"
