# ---------- Base image ----------
FROM python:3.11-slim

# ---------- Set working directory ----------
WORKDIR /app

# ---------- System dependencies ----------
RUN apt-get update && apt-get install -y \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# ---------- Backend ----------
COPY backend backend

RUN pip install --no-cache-dir -r backend/requirements.txt

# ---------- Frontend ----------
COPY frontend frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# ---------- Back to app root ----------
WORKDIR /app

# ---------- Environment ----------
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

# ---------- Start server ----------
CMD ["uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "8080"]
