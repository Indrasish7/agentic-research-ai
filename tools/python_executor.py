def python_executor(code: str) -> str:
    try:
        local_env = {}
        exec(code, {}, local_env)
        return str(local_env)
    except Exception as e:
        return f"Python execution error: {str(e)}"
