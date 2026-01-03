class AgentState:
    def __init__(self, objective: str):
        self.objective = objective
        self.current_step = 0
        self.completed_steps = []
        self.tool_outputs = {}
        self.failed = False

    def record_step(self, step_id: int, output):
        self.completed_steps.append(step_id)
        self.tool_outputs[step_id] = output
        self.current_step += 1

    def mark_failed(self):
        self.failed = True
