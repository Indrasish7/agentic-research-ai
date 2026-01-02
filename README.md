# Agentic Research AI

An **autonomous, task-oriented Agentic AI system** that plans, executes, evaluates, and terminates multi-step research tasks using structured planning, tool orchestration, and stateful execution.

This project demonstrates **agentic AI system design**, not just LLM tool usage.

---

## 🔍 What This Project Does

Given a high-level goal such as:

> *“Analyze competitors of Stripe”*

The system:
1. **Plans** a structured sequence of steps
2. **Selects tools autonomously** for each step
3. **Executes steps sequentially**
4. **Tracks state and intermediate outputs**
5. **Terminates cleanly** after completing the task

This is a foundation for **reliable, controllable autonomous AI systems**.

---

## 🧠 Why Agentic AI (Not Just an AI Agent)

Unlike simple AI agents or chatbots, this system is **agentic**:

- Explicit goal representation
- Structured planning (JSON plans)
- Autonomous tool selection
- Stateful execution
- Deterministic control flow
- Designed for evaluation, retries, and termination

> **Agentic AI = decision-making systems, not just responses.**

---

## 🏗️ System Architecture

```
User Goal
   ↓
Planner (LLM)
   ↓
Structured Plan (JSON)
   ↓
Executor
   ↓
Tool Calls
   ↓
State Manager
   ↓
Final Output
```

---

## 📁 Project Structure

```
agentic-research-ai/ 
├── planner/           # Converts goals into structured execution plans
├── executor/          # Executes steps using autonomous tool selection
├── evaluator/         # (Phase 1.3) Evaluates step success & termination
├── tools/             # Tool implementations (search, summarization, code)
├── state/             # Tracks execution state & intermediate outputs
├── main.py            # Orchestrates the agent loop
├── requirements.txt   # Dependencies
└── README.md
```

---

## ⚙️ Core Components

### Planner
- Uses **Gemini (google.genai)**
- Outputs **JSON-only structured plans**
- No execution logic
- No free-text output

### Executor
- Dynamically selects and executes tools
- Reads planner output
- Executes steps sequentially

### Tools
- web_search – research queries
- summarizer – text summarization
- python_executor – controlled code execution

### State Manager
- Tracks completed steps and outputs
- Stores intermediate outputs
- Enables evaluation & retries

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/Indrasish7/agentic-research-ai.git
cd agentic-research-ai
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file:
```
GEMINI_API_KEY=your_api_key_here
```

Run:
```bash
python main.py
```

---
## 🧠 Design Principles

- **Explicit over implicit** — structured plans over free-text reasoning  
- **Control over autonomy** — no infinite loops or uncontrolled execution  
- **Stateful execution** — all steps and outputs are tracked  
- **Production-oriented architecture** — modular, debuggable components  
- **Interview-defensible system design** — clear trade-offs and explainable decisions
---

## 🛣️ Roadmap

- [x] Structured planner
- [x] Autonomous executor loop
- [x] State tracking
- [ ] Evaluation & retry logic
- [ ] Termination guards
- [ ] API deployment

---

## 👤 Author

**Indrasish Bhattacharjee**  
AI Engineer | Applied AI Systems | Agentic AI  

- **GitHub:** https://github.com/Indrasish7  
- **LinkedIn:** https://www.linkedin.com/in/indrasishbhattacharjee/

---

## 📄 License

This project is licensed under the MIT License.
