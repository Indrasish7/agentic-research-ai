from planner.planner import Planner
import json

if __name__ == "__main__":
    planner = Planner()
    plan = planner.generate_plan("Analyze competitors of Stripe")
    print(json.dumps(plan, indent=2))
