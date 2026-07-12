from ai.config import client


class EvidenceSummarizer:
    def __init__(self):
        self.client = client

    def summarize(self, evidence_text: str) -> str:
        prompt = f"""
You are an AI assistant for the SafeHer women's safety platform.

Your task is to summarize the following evidence in a concise and professional manner.

Evidence:
{evidence_text}

Provide:
- A clear summary
- Important threats or incidents
- Keep the response under 120 words.
"""

        response = self.client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        return response.text.strip()