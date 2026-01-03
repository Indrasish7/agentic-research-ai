def summarize(text: str) -> str:
    """
    Simulated summarization tool.
    """

    if not text or "Error" in text:
        return "Error: No content available for summarization"

    return (
        "Key competitors to Stripe include Adyen, PayPal/Braintree, "
        "Square, and Checkout.com. Adyen and Checkout.com focus on "
        "enterprise and global markets, while PayPal and Square cater "
        "more to consumers and SMBs. Stripe differentiates itself "
        "through developer experience and API flexibility."
    )
