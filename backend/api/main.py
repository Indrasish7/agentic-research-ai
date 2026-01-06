from fastapi import FastAPI
from backend.api.schemas import AgentRequest, AgentResponse
from backend.api.agent_runner import run_agent

app = FastAPI(
    title="Agentic Research AI",
    description="Production-ready agentic AI backend",
    version="1.0.0"
)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/run-agent", response_model=AgentResponse)
def run_agent_endpoint(request: AgentRequest):
    result = run_agent(request.objective)
    return result
