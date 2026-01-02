from planner.planner import Planner
from executor.executor import Executor
from state.state_manager import AgentState

import json


if __name__ == "__main__":
    planner = Planner()
    executor = Executor()

    goal = "Analyze competitors of Stripe"

    plan = planner.generate_plan(goal)
    print("PLAN:")
    print(json.dumps(plan, indent=2))

    state = AgentState(plan["objective"])

    print("\nEXECUTION:")
    for step in plan["steps"]:
        print(f"\nExecuting Step {step['id']} → {step['tool']}")
        output = executor.execute_step(step)
        state.record_step(step["id"], output)
        print(f"Output: {output}")

    print("\nFINAL STATE:")
    print(json.dumps(state.tool_outputs, indent=2))
