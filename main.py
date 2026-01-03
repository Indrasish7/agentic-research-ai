from planner.planner import Planner
from executor.executor import Executor
from evaluator.evaluator import Evaluator
from state.state_manager import AgentState
from agent_logging.logger import AgentLogger

import json


if __name__ == "__main__":
    # Initialize core components
    planner = Planner()
    executor = Executor()
    evaluator = Evaluator(max_retries=2)
    logger = AgentLogger()

    goal = "Analyze competitors of Stripe"

    # Generate plan
    plan = planner.generate_plan(goal)
    print("PLAN:")
    print(json.dumps(plan, indent=2))

    # Initialize state
    state = AgentState(plan["objective"])

    print("\nEXECUTION WITH EVALUATION:")

    for step in plan["steps"]:
        step_id = step["id"]

        while True:
            # Log step start
            logger.log("step_started", step)

            print(f"\nExecuting Step {step_id} → {step['tool']}")
            output = executor.execute_step(step)

            # Log tool output
            logger.log("step_output", {
                "step_id": step_id,
                "output": output
            })

            # Evaluate using step context
            decision = evaluator.evaluate(step, output)
            print(f"Evaluation decision: {decision}")

            # Log evaluation decision
            logger.log("evaluation_decision", {
                "step_id": step_id,
                "decision": decision
            })

            if decision == "success":
                state.record_step(step_id, output)
                print("Step succeeded.")
                break

            elif decision == "retry":
                print("Retrying step...")
                state.record_retry()

                logger.log("step_retry", {
                    "step_id": step_id,
                    "retry_count": state.metrics["retries"]
                })

            else:  # fail
                print("Step failed. Terminating agent.")
                state.mark_failed()

                logger.log("agent_terminated", {
                    "step_id": step_id,
                    "reason": "evaluation_failed"
                })
                break

        if state.failed:
            break

    print("\nFINAL STATE:")
    print(json.dumps(state.tool_outputs, indent=2))

    print("\nMETRICS:")
    print(json.dumps(state.metrics, indent=2))
