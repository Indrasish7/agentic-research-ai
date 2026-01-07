from fastapi import FastAPI
import os
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.api.schemas import AgentRequest, AgentResponse
from backend.api.agent_runner import run_agent
from dotenv import load_dotenv
load_dotenv()


app = FastAPI(
    title="Agentic Research AI",
    description="Production-ready agentic AI backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for now (tighten later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/run-agent", response_model=AgentResponse)
def run_agent_endpoint(request: AgentRequest):
    result = run_agent(request.objective)
    return result

# ---------- Frontend serving ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_BUILD_PATH = os.path.join(BASE_DIR, "../../frontend/build")

app.mount(
    "/static",
    StaticFiles(directory=os.path.join(FRONTEND_BUILD_PATH, "static")),
    name="static",
)

@app.get("/")
def serve_frontend():
    return FileResponse(os.path.join(FRONTEND_BUILD_PATH, "index.html"))