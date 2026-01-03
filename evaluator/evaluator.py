class Evaluator:
    def __init__(self, max_retries: int = 2):
        self.max_retries = max_retries
        self.retry_count = {}

    def evaluate(self, step_id: int, output: str) -> str:
        """
        Returns one of: 'success', 'retry', 'fail'
        """

        # Initialize retry counter
        if step_id not in self.retry_count:
            self.retry_count[step_id] = 0

        # Basic heuristic checks (simple but effective)
        if output is None or len(output.strip()) == 0:
            return self._retry_or_fail(step_id)

        if "error" in output.lower():
            return self._retry_or_fail(step_id)

        # Otherwise, treat as success
        return "success"

    def _retry_or_fail(self, step_id: int) -> str:
        self.retry_count[step_id] += 1

        if self.retry_count[step_id] <= self.max_retries:
            return "retry"
        else:
            return "fail"
