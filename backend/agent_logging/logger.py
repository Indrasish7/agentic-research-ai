import json
import datetime


class AgentLogger:
    def log(self, event_type: str, payload: dict):
        log_entry = {
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "event": event_type,
            "payload": payload
        }
        print(json.dumps(log_entry))
