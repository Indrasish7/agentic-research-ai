import random

def web_search(query: str) -> str:
    """
    Simulated realistic web search tool.
    Returns structured, content-rich results.
    """

    # Simulate transient failure
    if random.random() < 0.15:
        return "Error: Search service unavailable"

    results = [
        {
            "name": "Adyen",
            "focus": "Enterprise payment processing",
            "strengths": "Global reach, strong compliance, scalable infrastructure",
            "weaknesses": "Complex integration, higher cost"
        },
        {
            "name": "PayPal / Braintree",
            "focus": "Online payments and wallets",
            "strengths": "Brand recognition, consumer trust, easy setup",
            "weaknesses": "Higher transaction fees, limited customization"
        },
        {
            "name": "Square",
            "focus": "SMB point-of-sale and payments",
            "strengths": "Ease of use, POS integration",
            "weaknesses": "Limited international reach"
        },
        {
            "name": "Checkout.com",
            "focus": "Global digital payments",
            "strengths": "Strong API, international support",
            "weaknesses": "Less ecosystem maturity than Stripe"
        }
    ]

    return f"Search results for query '{query}':\n{results}"
