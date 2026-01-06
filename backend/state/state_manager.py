class AgentState:
    """
    Tracks execution state, outputs, failures, and metrics
    for the agentic AI system.
    """

    def __init__(self, objective: str):
        self.objective = objective
        self.current_step = 0
        self.completed_steps = []
        self.tool_outputs = {}
        self.failed = False

        # Metrics for observability
        self.metrics = {
            "steps_executed": 0,
            "retries": 0
        }

    def record_step(self, step_id: int, output: str):
        """
        Record successful completion of a step.
        """
        self.completed_steps.append(step_id)
        self.tool_outputs[step_id] = output
        self.current_step += 1
        self.metrics["steps_executed"] += 1

    def record_retry(self):
        """
        Record a retry attempt.
        """
        self.metrics["retries"] += 1

    def mark_failed(self):
        """
        Mark the agent as failed and terminate execution.
        """
        self.failed = True
