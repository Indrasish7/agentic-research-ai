from tools.web_search import web_search
from tools.summarizer import summarize
from tools.python_executor import python_executor


class Executor:
    def __init__(self):
        self.tool_map = {
            "web_search": web_search,
            "summarizer": summarize,
            "python_executor": python_executor
        }

    def execute_step(self, step: dict):
        tool_name = step["tool"]
        tool_input = step["input"]

        if tool_name not in self.tool_map:
            raise ValueError(f"Unknown tool: {tool_name}")

        tool_fn = self.tool_map[tool_name]
        return tool_fn(tool_input)
