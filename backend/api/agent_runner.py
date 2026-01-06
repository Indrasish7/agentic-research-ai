from backend.planner.planner import Planner
from backend.executor.executor import Executor
from backend.evaluator.evaluator import Evaluator
from backend.state.state_manager import AgentState


def run_agent(objective: str) -> dict:
    planner = Planner()
    executor = Executor()
    evaluator = Evaluator(max_retries=2)

    plan = planner.generate_plan(objective)
    state = AgentState(plan["objective"])

    execution_steps = []

    for step in plan["steps"]:
        step_id = step["id"]

        while True:
            output = executor.execute_step(step)
            decision = evaluator.evaluate(step, output)

            if decision == "success":
                state.record_step(step_id, output)
                execution_steps.append({
                    "step_id": step_id,
                    "tool": step["tool"],
                    "status": "success",
                    "output": output
                })
                break

            elif decision == "retry":
                state.record_retry()

            else:
                execution_steps.append({
                    "step_id": step_id,
                    "tool": step["tool"],
                    "status": "failed",
                    "output": output
                })
                state.mark_failed()
                break

        if state.failed:
            break

    return {
        "objective": objective,
        "plan": {"steps": plan["steps"]},
        "execution": {"steps": execution_steps},
        "final_state": {"results": state.tool_outputs},
        "metrics": state.metrics
    }
