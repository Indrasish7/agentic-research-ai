# 🧠 Agentic Research AI

An end-to-end **Agentic AI system** that autonomously plans, executes, evaluates, and completes multi-step research tasks using **LLMs (Gemini)**, **FastAPI**, and a **React + Tailwind frontend**, fully deployed on **Google Cloud Run**.

---

## 🚀 Live Demo

**Cloud Run URL:**  
👉 https://agentic-ai-539457733412.asia-south1.run.app

---

## 🧩 What is Agentic Research AI?

Unlike traditional AI chat systems, this project implements a **true agentic loop**:

1. **Planning** – Breaks a high-level goal into structured steps  
2. **Execution** – Selects and runs tools autonomously  
3. **Evaluation** – Decides success, retry, or failure  
4. **State Tracking** – Maintains execution state and metrics  
5. **Termination** – Produces a final grounded result  

No hard-coded answers. No static flows.

---

## 🏗️ System Architecture

```
User Goal
   ↓
Planner (Gemini)
   ↓
Structured Plan (JSON)
   ↓
Executor (Tools)
   ↓
Evaluator (Retry / Fail / Success)
   ↓
State Manager
   ↓
Final Result
```

### Core Tools
- `web_search` – Research queries
- `summarizer` – Information synthesis
- `python_executor` – Controlled computation

---

## 🖥️ Tech Stack

### Backend
- **FastAPI**
- **Google Gemini API**
- **Python 3.11**
- **Docker**
- **Cloud Run**

### Frontend
- **React**
- **Tailwind CSS**
- **Framer Motion**
- **Axios**

### Infrastructure
- **Docker**
- **Google Cloud Build**
- **Artifact Registry**
- **Cloud Run**

---

## 📁 Project Structure

```
agentic-research-agent/
│
├── backend/
│   ├── api/
│   │   ├── main.py
│   │   ├── agent_runner.py
│   │   └── schemas.py
│   ├── planner/
│   ├── executor/
│   ├── evaluator/
│   ├── state/
│   └── tools/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
|   ├── postcss.config.js
│   └── tailwind.config.js
│
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

---

## 🧪 Local Development

### 1️⃣ Backend (FastAPI)

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

pip install -r requirements.txt
uvicorn backend.api.main:app --reload --port 8000
```

Health check:
```
http://localhost:8000/api/health
```

---

### 2️⃣ Frontend (React)

```bash
cd frontend
npm install
npm start
```

Create production build:
```bash
npm run build
```

---

## 🐳 Docker (Local)

```bash
docker build -t agentic-ai .
docker run -p 8080:8080 -e GEMINI_API_KEY=YOUR_KEY agentic-ai
```

App runs at:
```
http://localhost:8080
```

---

## ☁️ Deployment (Google Cloud Run)

### 1️⃣ Create Project & Enable APIs

```bash
gcloud projects create agentic-research-ai-prod
gcloud config set project agentic-research-ai-prod
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

---

### 2️⃣ Build & Push Image

```bash
gcloud builds submit --tag asia-south1-docker.pkg.dev/agentic-research-ai-prod/agentic-repo/agentic-ai .
```

---

### 3️⃣ Deploy

```bash
gcloud run deploy agentic-ai   --image asia-south1-docker.pkg.dev/agentic-research-ai-prod/agentic-repo/agentic-ai   --platform managed   --region asia-south1   --allow-unauthenticated   --set-env-vars GEMINI_API_KEY=YOUR_KEY
```

---

## 🔐 Environment Variables

| Variable | Description |
|--------|------------|
| `GEMINI_API_KEY` | Google Gemini API key |
| `REACT_APP_BACKEND_URL` | Backend base URL (frontend) |

---

## 📈 Metrics & Observability

- Steps executed
- Retry counts
- Tool success rate
- Execution state tracking

---

## 👨‍💻 Author

**Indrasish Bhattacharjee**  
- GitHub: https://github.com/Indrasish7  
- LinkedIn: https://www.linkedin.com/in/indrasishbhattacharjee/

---

## 📜 License

MIT License

---

⭐ If you like this project, consider giving it a star!
