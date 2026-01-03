from planner.planner import Planner
from executor.executor import Executor
from evaluator.evaluator import Evaluator
from state.state_manager import AgentState

import json


if __name__ == "__main__":
    planner = Planner()
    executor = Executor()
    evaluator = Evaluator(max_retries=2)

    goal = "Analyze competitors of Stripe"

    plan = planner.generate_plan(goal)
    print("PLAN:")
    print(json.dumps(plan, indent=2))

    state = AgentState(plan["objective"])

    print("\nEXECUTION WITH EVALUATION:")

    for step in plan["steps"]:
        step_id = step["id"]

        while True:
            print(f"\nExecuting Step {step_id} → {step['tool']}")
            output = executor.execute_step(step)

            decision = evaluator.evaluate(step_id, output)
            print(f"Evaluation decision: {decision}")

            if decision == "success":
                state.record_step(step_id, output)
                print("Step succeeded.")
                break

            elif decision == "retry":
                print("Retrying step...")

            else:  # fail
                print("Step failed. Terminating agent.")
                state.mark_failed()
                break

        if state.failed:
            break

    print("\nFINAL STATE:")
    print(json.dumps(state.tool_outputs, indent=2))
