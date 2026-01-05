from pydantic import BaseModel
from typing import List, Dict, Any


class AgentRequest(BaseModel):
    objective: str


class PlanStep(BaseModel):
    id: int
    tool: str
    input: str


class ExecutionStep(BaseModel):
    step_id: int
    tool: str
    status: str
    output: str


class AgentResponse(BaseModel):
    objective: str
    plan: Dict[str, List[PlanStep]]
    execution: Dict[str, List[ExecutionStep]]
    final_state: Dict[str, Any]
    metrics: Dict[str, int]
